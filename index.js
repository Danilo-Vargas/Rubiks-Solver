

      // He creado este código para resolver el cubo de Rubik´s 3x3, ten en cuenta que lo estoy creando completamente
     // desde cero, usando mi propia lógica de programación y usando los algoritmos que para mí han sido los más
    // sencillos de programar, por lo tanto no es el algoritmo más eficiente para la resolución, pero es funcional.

      // Éste es un reto que ya he realizado antes, pero el resultado final no me gusto, aunque si funcionó completamente.
     // Dejaré el enlace a los códigos anteriores, ya que lo hice en dos versiones, la primera recuerdo que fue en JS y la
    // segunda en C++

        // He optado por hacer esta versión en JS para poder publicarla en un sitio web, como parte de mi portafolio, donde
       // podré añadir una interfáz gráfica bastante amigable y funcional, y dejando una nomenclatura de los movimientos
      // bien establecida para poder integrar el programa con un robot que pueda leer la nomenclatura y resolver el cubo de
     // Rubik´s, y que también el robot pueda proporcionar el estado del cubo al programa. Me he basado en uno de los métodos
    // que se usan para armar el cubo de Rubik´s a ciegas, el metodo para BLIND.

        // Dicho lo anterior, sólo queda comenzar con el código y la explicación del mismo

       // Creaador: Aldo Danilo Vargas Esquivel
      // Inicio del proyecto: 27/10/2024
     // Fin del proyecto: --/--/----
    // Repositorio de GitHub: https://github.com/Danilo-Vargas/Rubiks-Solver
   
        // Visíta mi sitio web https://danilovargas.tech para conocer más acerca de mí y los proyectos en los que he trabajado

                  ////////////////////////////////////////////////////////////////////////////////////////////
                 
                   //////////    ///      ///  ///////////   ////////////  ///      ///  ///  ///////////
                  ///     ////  ///      ///  ///     ////      ////      ///      ///  //  ///
                 ///     ////  ///      ///  ///     ////      ////      ///    ////       ///
                //////////    ///      ///  //////////        ////      /////////          /////////
               ///    ////   ///      ///  ///     ////      ////      ///    ////                ///
              ///      ///  ////    ////  ///     ////      ////      ///      ///              ////
             ///      ///    ////////    ///////////   ////////////  ///      ///      ///////////

        ////////////////////////////////////////////////////////////////////////////////////////////


    // ------------------------------ Ejecución del código ------------------------------

      // Para ejecutar el código en node, usar el comando: node index.js
     // Si quieres que se esté actualizando en tiempo real utilizar el comando: node --watch index.js
    // O si cuentas con nodemon, utiliza el comando: nodemon index.js

             // Para ingresar el estado del cubo, utilizar la función del objeto json Cubo.setEstado()
            // y pasar como parámetro un objeto como se indica a continuación:
           //
          //                    Cubo.setEstado({                De esta manera con todas las
         //                         AM: [                       caras, siguiendo el orden
        //                              'AM0','AM1','AM2',      que se encuentra en el diagrama
       //                               'AM3','AM4','AM5',      de las posiciones de los
      //                                'AM6','AM7','AM8'       colores.
     //                             ],
    //                          });


    // ----------------------------- Explicación del código -----------------------------

    // Iniciemos explicando la estructura digital del cubo que crearé

    // Para los colores usaré las siguientes claves:

    //     Amarillo - AM
    //     Blanco   - BL
    //     Verde    - VE
    //     Azul     - AZ
    //     Rojo     - RO
    //     Naranja  - NA

     // Y cada posición del cubo tendrá un nombre específico, este nombre serán letras del abecedario según
    // el orden que me aprendí para armarlo con el metodo que se usa para armarlo a ciegas

     // Para las aristas se usarán letras mayúsculas:
    // A B C D E F G H I J L M N O P Q R S T U V
   
     // Para las esquinas se usarán letras minúsculas:
    // a b c d e f g h i j k l m n o p q r s t u

    // El cubo siempre estará orientado con la cara amarilla arriba y la verde enfrente:

    // ╩ ╦ ╠ ═ ╬ ╣ ║ ╗ ╝ ╚ ╔ ¬ │ ┤ ┤ ┐ └ ┴ ┬ ├ ─ ┼ 

    //                                  ╔══════════╗
    //                                  ║          ║
    //                                  ║    AM    ║
    //                                  ║          ║
    //            ╔══════════╦══════════╬══════════╬══════════╗
    //            ║          ║          ║          ║          ║
    //            ║    AZ    ║    RO    ║    VE    ║    NA    ║
    //            ║          ║          ║          ║          ║
    //            ╚══════════╩══════════╬══════════╬══════════╝
    //                                  ║          ║
    //                                  ║    BL    ║
    //                                  ║          ║
    //                                  ╚══════════╝

    // Las posiciónes del cubo:

    //                                                ╔═════╦═════╦═════╗
    //             ▓▓▓ - BUFFER principal             ║ ▓▓▓ |  E  |  b  ║
    //                                                ╠─────┼─────┼─────╣
    //             ▒▒▒ - Complemento de BUFFER        ║  A  | AMA | ▓▓▓ ║
    //                                                ╠─────┼─────┼─────╣
    //                                                ║  c  |  C  |  a  ║
    //            ╔═════╦═════╦═════╦═════╦═════╦═════╬═════╬═════╬═════╬═════╦═════╦═════╗
    //            ║  j  |  F  | ▒▒▒ ║ ▒▒▒ |  B  |  o  ║  h  |  D  |  i  ║  p  | ▒▒▒ |  q  ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║  L  | AZU |  M  ║  N  | ROJ |  G  ║  H  | VER |  I  ║  J  | NAR |  K  ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║  m  |  U  |  n  ║  r  |  O  |  s  ║  k  |  Q  |  l  ║  t  |  S  |  u  ║
    //            ╚═════╩═════╩═════╩═════╩═════╩═════╬═════╬═════╬═════╬═════╩═════╩═════╝
    //                                                ║  d  |  R  |  e  ║
    //              El BUFFER es la pieza que         ╠─────┼─────┼─────╣
    //              funcionará como sensor para       ║  P  | BLA |  T  ║
    //              saber que pieza se debe           ╠─────┼─────┼─────╣
    //              acomodar                          ║  g  |  V  |  f  ║
    //                                                ╚═════╩═════╩═════╝

    // El indice de cada posición de cada cara en la matriz se define de la siguiente manera:

    //
    //    ╔═════╦═════╦═════╗
    //    ║  0  |  1  |  2  ║    AM: [              Estaos indicando el indice de las posiciones
    //    ╠─────┼─────┼─────╣        0, 1, 2,       en la cara amarilla, sin embargo, se debe
    //    ║  3  |  4  |  5  ║        3, 4, 5,       indicar el color que se encuentra en esa 
    //    ╠─────┼─────┼─────╣        6, 7, 8        posición de acuerdo a las claves establecidas
    //    ║  6  |  7  |  8  ║    ]                  al inicio.
    //    ╚═════╩═════╩═════╝
    //

    // Diagrama de posiciones de los colores:

    //                                                ╔═════╦═════╦═════╗
    //                                                ║ AM0 | AM1 | AM2 ║
    //                                                ╠─────┼─────┼─────╣
    //                                                ║ AM3 | AM4 | AM5 ║
    //                                                ╠─────┼─────┼─────╣
    //                                                ║ AM6 | AM7 | AM8 ║
    //            ╔═════╦═════╦═════╦═════╦═════╦═════╬═════╬═════╬═════╬═════╦═════╦═════╗
    //            ║ AZ0 | AZ1 | AZ2 ║ RO0 | RO1 | RO2 ║ VE0 | VE1 | VE2 ║ NA0 | NA1 | NA2 ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║ AZ3 | AZ4 | AZ5 ║ RO3 | RO4 | RO5 ║ VE3 | VE4 | VE5 ║ NA3 | NA4 | NA5 ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║ AZ6 | AZ7 | AZ8 ║ RO6 | RO7 | RO8 ║ VE6 | VE7 | VE8 ║ NA6 | NA7 | NA8 ║
    //            ╚═════╩═════╩═════╩═════╩═════╩═════╬═════╬═════╬═════╬═════╩═════╩═════╝
    //                                                ║ BL0 | BL1 | BL2 ║
    //             En el diagrama se observan dos     ╠─────┼─────┼─────╣
    //             letras y un número, de la          ║ BL3 | BL4 | BL5 ║
    //             siguiente manera: XXN, donde:      ╠─────┼─────┼─────╣
    //             XX = color de la cara              ║ BL6 | BL7 | BL8 ║
    //             N = índice dentro de la matriz     ╚═════╩═════╩═════╝

let Cubo = {
    estado: {
        AM: [
            'AM0','AM1','AM2',
            'AM3','AM4','AM5',
            'AM6','AM7','AM8'
        ],
        BL: [
            'BL0','BL1','BL2',
            'BL3','BL4','BL5',
            'BL6','BL7','BL8'
        ],
        VE: [
            'VE0','VE1','VE2',
            'VE3','VE4','VE5',
            'VE6','VE7','VE8'
        ],
        AZ: [
            'AZ0','AZ1','AZ2',
            'AZ3','AZ4','AZ5',
            'AZ6','AZ7','AZ8'
        ],
        RO: [
            'RO0','RO1','RO2',
            'RO3','RO4','RO5',
            'RO6','RO7','RO8'
        ],
        NA: [
            'NA0','NA1','NA2',
            'NA3','NA4','NA5',
            'NA6','NA7','NA8'
        ]
    },
    posiciones:{
        buffer: '', // Esquinas
        aip: '',
        bqj: '',
        coh: '',
        dsk: '',
        elt: '',
        fum: '',
        gnr: '',
        BUFFER: '', // Aristas
        AB: '',
        CD: '',
        EF: '',
        GH: '',
        IJ: '',
        KL: '',
        MN: '',
        OP: '',
        QR: '',
        ST: '',
        UV: ''
    },
    setPosiciones: ()=>{

        let { AM, BL, VE, AZ, RO, NA } = Cubo.estado;
        
        Cubo.posiciones.buffer = AM[0]+'-'+AZ[2]+'-'+RO[0];
        Cubo.posiciones.aip    = AM[8]+'-'+VE[2]+'-'+NA[0];
        Cubo.posiciones.bqj    = AM[2]+'-'+NA[2]+'-'+AZ[0];
        Cubo.posiciones.coh    = AM[6]+'-'+RO[2]+'-'+VE[0];
        Cubo.posiciones.dsk    = BL[0]+'-'+RO[8]+'-'+VE[6];
        Cubo.posiciones.elt    = BL[2]+'-'+VE[8]+'-'+NA[6];
        Cubo.posiciones.fum    = BL[8]+'-'+NA[8]+'-'+AZ[6];
        Cubo.posiciones.gnr    = BL[6]+'-'+AZ[8]+'-'+RO[6];
        Cubo.posiciones.BUFFER = AM[5]+'-'+NA[1];
        Cubo.posiciones.AB     = AM[3]+'-'+RO[1];
        Cubo.posiciones.CD     = AM[7]+'-'+VE[1];
        Cubo.posiciones.EF     = AM[1]+'-'+AZ[1];
        Cubo.posiciones.GH     = RO[5]+'-'+VE[3];
        Cubo.posiciones.IJ     = VE[5]+'-'+NA[3];
        Cubo.posiciones.KL     = NA[5]+'-'+AZ[3];
        Cubo.posiciones.MN     = AZ[5]+'-'+RO[3];
        Cubo.posiciones.OP     = RO[7]+'-'+BL[3];
        Cubo.posiciones.QR     = VE[7]+'-'+BL[1];
        Cubo.posiciones.ST     = NA[7]+'-'+BL[5];
        Cubo.posiciones.UV     = AZ[7]+'-'+BL[7];

    },
    move: {
        U: ()=>{

            let { AM, VE, RO, AZ, NA } = Cubo.estado;

            let buffer_esquina;
            let buffer_arista;

            // Movimiento de esquinas en la cara
            buffer_esquina = AM[0];
            AM[0] = AM[6];
            AM[6] = AM[8];
            AM[8] = AM[2];
            AM[2] = buffer_esquina;

            buffer_esquina = VE[0];
            VE[0] = NA[0];
            NA[0] = AZ[0];
            AZ[0] = RO[0];
            RO[0] = buffer_esquina;

            buffer_esquina = VE[2];
            VE[2] = NA[2];
            NA[2] = AZ[2];
            AZ[2] = RO[2];
            RO[2] = buffer_esquina;

            // Movimiento de aristas en la cara
            buffer_arista  = AM[1];
            AM[1] = AM[3];
            AM[3] = AM[7];
            AM[7] = AM[5];
            AM[5] = buffer_arista;

            buffer_arista  = VE[1];
            VE[1] = NA[1];
            NA[1] = AZ[1];
            AZ[1] = RO[1];
            RO[1] = buffer_arista;

        },
        L: ()=>{

        },
        D: ()=>{

        },
        R: ()=>{

        },
        B: ()=>{

        },
        F: ()=>{

        },
        E: ()=>{

        },
        M: ()=>{

        },
        S: ()=>{

        },
        Up: ()=>{
            Cubo.move.U();
            Cubo.move.U();
            Cubo.move.U();
        },
        Lp: ()=>{

        },
        Dp: ()=>{

        },
        Rp: ()=>{

        },
        Bp: ()=>{

        },
        Fp: ()=>{

        },
        Ep: ()=>{

        },
        Mp: ()=>{

        },
        Sp: ()=>{

        },
        U2: ()=>{
            Cubo.move.U();
            Cubo.move.U();
        },
        L2: ()=>{

        },
        D2: ()=>{

        },
        R2: ()=>{

        },
        B2: ()=>{

        },
        F2: ()=>{

        },
        E2: ()=>{

        },
        M2: ()=>{

        },
        S2: ()=>{

        },
        
    }
};


// codigo de prueba:
Cubo.move.U2();
Cubo.setPosiciones();
console.log(Cubo.posiciones);
