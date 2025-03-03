const { connect } = require('nats');

(async () => {
  try {
    // Conexión al servidor NATS
    const nc = await connect({ servers: 'nats://localhost:4222' });
    console.log('Conectado a NATS');

    // Enviar un mensaje a un canal
    const subject = 'test';
    nc.publish(subject, 'Hola desde NATS');
    console.log('Mensaje enviado a ' + subject);

    // Suscripción al canal 'test' para recibir mensajes
    const sub = nc.subscribe(subject);
    console.log(`Esperando mensajes en el canal ${subject}...`);

    // Escuchar los mensajes recibidos
    for await (const msg of sub) {
      console.log(`Recibido: ${msg.data}`);
    }

    // Mantener la conexión abierta
    // La suscripción continuará esperando mensajes hasta que decidas cerrar la conexión
  } catch (err) {
    console.error('Error al conectar a NATS:', err);
  }
})();
