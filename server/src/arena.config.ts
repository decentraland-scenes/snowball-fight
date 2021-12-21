import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
//import  { initializeApp, applicationDefault, cert } from '../node_modules/firebase-admin/lib/app'



/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer
        .define('my_room', MyRoom)
        .filterBy(['realm'])

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        

       // const db = getFirestore()       
        
        
        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});