const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log("cliente conectado");
            
            // Escuchar evento: mensaje-to-server
            // socket.on('mensaje-to-server', ( data ) => {
            //     console.log( data );
                
            //     this.io.emit('mensaje-from-server', data );
            // });
            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.createTicket();
                callback(nuevoTicket);
            })


            socket.on('next-ticket-work', ({ agente, escritorio }, callback) => {

                const yourTicket = this.ticketList.assignTicket( agente, escritorio);

                callback( yourTicket );

                this.io.emit('ticket-assigned', this.ticketList.last13 );
            })
            
        
        });
    }


}


module.exports = Sockets;