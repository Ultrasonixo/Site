/**
 * Importar os módulos necessários (Sintaxe V2)
 */
// onCall para a função que o frontend chama
// onRequest para a função que o Mercado Pago (externo) chama (o Webhook)
const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago"); // Importa 'Payment'

// Inicializa o Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Define a região para todas as funções
setGlobalOptions({ region: "southamerica-east1" });

/**
 * ===================================================================
 * IMPORTANTE: Configure o seu Access Token do Mercado Pago
 * ===================================================================
 * Cole o seu "Access Token" de "Sandbox" (para testes) aqui.
 */
const MERCADOPAGO_ACCESS_TOKEN = "SEU_ACCESS_TOKEN_DE_TESTE_DO_MERCADO_PAGO_AQUI";

// Inicializa o cliente do Mercado Pago
const mpClient = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
  options: { timeout: 5000 },
});

// URL base do seu site (para os links de retorno)
const SITE_URL = "https://vertexsystemx.web.app"; // Substitua se for diferente

/**
 * ===================================================================
 * FUNÇÃO 1: createPaymentLink (Atualizada com notification_url)
 * ===================================================================
 */
exports.createPaymentLink = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Você precisa estar logado.");
  }
  const { produtoId } = request.data;
  const userId = request.auth.uid;
  const userEmail = request.auth.token.email;

  if (!produtoId) {
    throw new HttpsError("invalid-argument", "O ID do produto é obrigatório.");
  }

  try {
    const productDoc = await db.collection("produtos").doc(produtoId).get();
    if (!productDoc.exists) {
      throw new HttpsError("not-found", "Produto não encontrado.");
    }

    const produto = productDoc.data();
    const preco = parseFloat(produto.price.replace(",", "."));
    if (isNaN(preco) || preco <= 0) {
      throw new HttpsError("internal", "O preço do produto é inválido.");
    }

    console.log(`Iniciando pagamento para Produto: ${produto.name}, Preço: ${preco}, User: ${userId}`);

    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: [
          {
            id: produtoId,
            title: produto.name,
            quantity: 1,
            unit_price: preco,
            description: produto.subtitle,
            currency_id: "BRL",
          },
        ],
        payer: { email: userEmail },
        
        // --- ATUALIZAÇÃO IMPORTANTE ---
        // Agora, informamos ao MP qual URL ele deve chamar (o nosso webhook)
        // AVISO: O URL deve ser HTTPS (o Firebase Functions já fornece isso)
        // O NOME 'paymentwebhook' deve ser o mesmo da função abaixo
        notification_url: `https://southamerica-east1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/paymentWebhook`,
        
        back_urls: {
          success: `${SITE_URL}/dashboard/servicos?payment=success`,
          failure: `${SITE_URL}/checkout/${produtoId}?payment=failure`,
          pending: `${SITE_URL}/checkout/${produtoId}?payment=pending`,
        },
        auto_return: "approved",
        external_reference: JSON.stringify({
          userId: userId,
          productId: produtoId,
          productName: produto.name,
          price: preco,
        }),
      },
    });

    if (!result.id || !result.init_point) {
      console.error("Resposta inesperada do Mercado Pago:", result);
      throw new HttpsError("internal", "Não foi possível criar o link de pagamento.");
    }

    return {
      preferenceId: result.id,
      paymentUrl: result.init_point,
    };

  } catch (error) {
    console.error("Erro ao criar preferência no MP:", error.response?.data || error.message);
    throw new HttpsError(
      "internal",
      "Não foi possível processar o seu pedido de pagamento.",
      error.message
    );
  }
});


/**
 * ===================================================================
 * FUNÇÃO 2: paymentWebhook (NOVA FUNÇÃO)
 * ===================================================================
 * Esta função é chamada pelo Mercado Pago (não pelo seu site)
 */
exports.paymentWebhook = onRequest(async (req, res) => {
  // O Mercado Pago envia um POST com 'type' e 'data.id'
  const notification = req.body;
  
  // 1. Validar que é um aviso de pagamento
  if (notification.type === "payment" && notification.data?.id) {
    const paymentId = notification.data.id;
    console.log(`[Webhook] Recebido aviso de pagamento ID: ${paymentId}`);

    try {
      // 2. Buscar os detalhes do pagamento no Mercado Pago
      const payment = new Payment(mpClient);
      const paymentInfo = await payment.get({ id: paymentId });

      // 3. Verificar se o pagamento está APROVADO
      if (paymentInfo.status === "approved" && paymentInfo.external_reference) {
        
        // 4. Extrair nossos dados (userId, productId)
        const ref = JSON.parse(paymentInfo.external_reference);
        const { userId, productId, productName, price } = ref;

        if (!userId || !productId) {
          throw new Error(`external_reference inválida no pagamento ${paymentId}`);
        }

        // 5. Verifica se esta assinatura já foi processada (evita duplicados)
        const subscriptionRef = db.collection("users").doc(userId).collection("subscriptions");
        const q = admin.firestore().collection("users").doc(userId).collection("subscriptions").where("paymentId", "==", paymentId).where("status", "==", "active");
        
        const existingSub = await q.get();

        if (existingSub.empty) {
          // 6. ADICIONA A ASSINATURA NO FIRESTORE (A PARTE SEGURA!)
          await subscriptionRef.add({
            productId: productId,
            status: 'active',
            startDate: admin.firestore.FieldValue.serverTimestamp(), // Usa o timestamp do admin
            paymentId: paymentId, // Guarda o ID do pagamento
            productName: productName,
            priceAtPurchase: price,
            payerEmail: paymentInfo.payer.email,
          });
          
          console.log(`[Webhook] SUCESSO: Assinatura ativada para User: ${userId}, Produto: ${productId}`);

        } else {
          console.log(`[Webhook] AVISO: Assinatura para Pagamento ID ${paymentId} já foi processada.`);
        }
      } else {
        console.log(`[Webhook] Status do pagamento não aprovado: ${paymentInfo.status}`);
      }

      // 7. Responde ao Mercado Pago com 200 OK
      res.status(200).send("OK");

    } catch (error) {
      console.error(`[Webhook] Erro ao processar pagamento ${paymentId}:`, error);
      res.status(500).send("Erro ao processar webhook.");
    }
  } else {
    // Se não for um aviso de pagamento, apenas ignora
    console.log("[Webhook] Recebida notificação que não é de pagamento:", notification.type);
    res.status(200).send("Notificação ignorada.");
  }
});

