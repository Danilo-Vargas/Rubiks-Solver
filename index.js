

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
         //                         YE: [                       caras, siguiendo el orden
        //                              'YE0','YE1','YE2',      que se encuentra en el diagrama
       //                               'YE3','YE4','YE5',      de las posiciones de los
      //                                'YE6','YE7','YE8'       colores.
     //                             ],
    //                          });


    // ----------------------------- Explicación del código -----------------------------

    // Iniciemos explicando la estructura digital del cubo que crearé

    // Para los colores usaré las siguientes claves:

    //     Amarillo - YE
    //     Blanco   - WH
    //     Verde    - GR
    //     Azul     - BL
    //     Rojo     - RE
    //     Naranja  - OR

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
    //                                  ║    YE    ║
    //                                  ║          ║
    //            ╔══════════╦══════════╬══════════╬══════════╗
    //            ║          ║          ║          ║          ║
    //            ║    BL    ║    RE    ║    GR    ║    OR    ║
    //            ║          ║          ║          ║          ║
    //            ╚══════════╩══════════╬══════════╬══════════╝
    //                                  ║          ║
    //                                  ║    WH    ║
    //                                  ║          ║
    //                                  ╚══════════╝

    // Las posiciónes del cubo:

    //                                                ╔═════╦═════╦═════╗
    //             ▓▓▓ - BUFFER principal             ║ ▓▓▓ |  E  |  b  ║
    //                                                ╠─────┼─────┼─────╣
    //             ▒▒▒ - Complemento de BUFFER        ║  A  | YEL | ▓▓▓ ║
    //                                                ╠─────┼─────┼─────╣
    //                                                ║  c  |  C  |  a  ║
    //            ╔═════╦═════╦═════╦═════╦═════╦═════╬═════╬═════╬═════╬═════╦═════╦═════╗
    //            ║  j  |  F  | ▒▒▒ ║ ▒▒▒ |  B  |  o  ║  h  |  D  |  i  ║  p  | ▒▒▒ |  q  ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║  L  | BLU |  M  ║  N  | RED |  G  ║  H  | GRE |  I  ║  J  | ORA |  K  ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║  m  |  U  |  n  ║  r  |  O  |  s  ║  k  |  Q  |  l  ║  t  |  S  |  u  ║
    //            ╚═════╩═════╩═════╩═════╩═════╩═════╬═════╬═════╬═════╬═════╩═════╩═════╝
    //                                                ║  d  |  R  |  e  ║
    //              El BUFFER es la pieza que         ╠─────┼─────┼─────╣
    //              funcionará como sensor para       ║  P  | WHI |  T  ║
    //              saber que pieza se debe           ╠─────┼─────┼─────╣
    //              acomodar                          ║  g  |  V  |  f  ║
    //                                                ╚═════╩═════╩═════╝

    // El indice de cada posición de cada cara en la matriz se define de la siguiente manera:

    //
    //    ╔═════╦═════╦═════╗
    //    ║  0  |  1  |  2  ║    YE: [              Estaos indicando el indice de las posiciones
    //    ╠─────┼─────┼─────╣        0, 1, 2,       en la cara amarilla, sin embargo, se debe
    //    ║  3  |  4  |  5  ║        3, 4, 5,       indicar el color que se encuentra en esa 
    //    ╠─────┼─────┼─────╣        6, 7, 8        posición de acuerdo a las claves establecidas
    //    ║  6  |  7  |  8  ║    ]                  al inicio.
    //    ╚═════╩═════╩═════╝
    //

    // Diagrama de posiciones de los colores:

    //                                                ╔═════╦═════╦═════╗
    //                                                ║ YE0 | YE1 | YE2 ║
    //                                                ╠─────┼─────┼─────╣
    //                                                ║ YE3 | YE4 | YE5 ║
    //                                                ╠─────┼─────┼─────╣
    //                                                ║ YE6 | YE7 | YE8 ║
    //            ╔═════╦═════╦═════╦═════╦═════╦═════╬═════╬═════╬═════╬═════╦═════╦═════╗
    //            ║ BL0 | BL1 | BL2 ║ RE0 | RE1 | RE2 ║ GR0 | GR1 | GR2 ║ OR0 | OR1 | OR2 ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║ BL3 | BL4 | BL5 ║ RE3 | RE4 | RE5 ║ GR3 | GR4 | GR5 ║ OR3 | OR4 | OR5 ║
    //            ╠─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╬─────┼─────┼─────╣
    //            ║ BL6 | BL7 | BL8 ║ RE6 | RE7 | RE8 ║ GR6 | GR7 | GR8 ║ OR6 | OR7 | OR8 ║
    //            ╚═════╩═════╩═════╩═════╩═════╩═════╬═════╬═════╬═════╬═════╩═════╩═════╝
    //                                                ║ WH0 | WH1 | WH2 ║
    //             En el diagrama se observan dos     ╠─────┼─────┼─────╣
    //             letras y un número, de la          ║ WH3 | WH4 | WH5 ║
    //             siguiente manera: XXN, donde:      ╠─────┼─────┼─────╣
    //             XX = color de la cara              ║ WH6 | WH7 | WH8 ║
    //             N = índice dentro de la matriz     ╚═════╩═════╩═════╝

let Cube = {
    state: {
        YE: [
            'YE0','YE1','YE2',
            'YE3','YE4','YE5',
            'YE6','YE7','YE8'
        ],
        WH: [
            'WH0','WH1','WH2',
            'WH3','WH4','WH5',
            'WH6','WH7','WH8'
        ],
        GR: [
            'GR0','GR1','GR2',
            'GR3','GR4','GR5',
            'GR6','GR7','GR8'
        ],
        BL: [
            'BL0','BL1','BL2',
            'BL3','BL4','BL5',
            'BL6','BL7','BL8'
        ],
        RE: [
            'RE0','RE1','RE2',
            'RE3','RE4','RE5',
            'RE6','RE7','RE8'
        ],
        OR: [
            'OR0','OR1','OR2',
            'OR3','OR4','OR5',
            'OR6','OR7','OR8'
        ]
    },
    positions:{
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
    setPositions: ()=>{

        let { YE, WH, GR, BL, RE, OR } = Cube.state;
        
        Cube.positions.buffer = YE[0]+'-'+BL[2]+'-'+RE[0];
        Cube.positions.aip    = YE[8]+'-'+GR[2]+'-'+OR[0];
        Cube.positions.bqj    = YE[2]+'-'+OR[2]+'-'+BL[0];
        Cube.positions.coh    = YE[6]+'-'+RE[2]+'-'+GR[0];
        Cube.positions.dsk    = WH[0]+'-'+RE[8]+'-'+GR[6];
        Cube.positions.elt    = WH[2]+'-'+GR[8]+'-'+OR[6];
        Cube.positions.fum    = WH[8]+'-'+OR[8]+'-'+BL[6];
        Cube.positions.gnr    = WH[6]+'-'+BL[8]+'-'+RE[6];
        Cube.positions.BUFFER = YE[5]+'-'+OR[1];
        Cube.positions.AB     = YE[3]+'-'+RE[1];
        Cube.positions.CD     = YE[7]+'-'+GR[1];
        Cube.positions.EF     = YE[1]+'-'+BL[1];
        Cube.positions.GH     = RE[5]+'-'+GR[3];
        Cube.positions.IJ     = GR[5]+'-'+OR[3];
        Cube.positions.KL     = OR[5]+'-'+BL[3];
        Cube.positions.MN     = BL[5]+'-'+RE[3];
        Cube.positions.OP     = RE[7]+'-'+WH[3];
        Cube.positions.QR     = GR[7]+'-'+WH[1];
        Cube.positions.ST     = OR[7]+'-'+WH[5];
        Cube.positions.UV     = BL[7]+'-'+WH[7];

    },
    move: {
        U: ()=>{

            let { YE, GR, RE, BL, OR } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas en la cara
            buffer_corner = YE[0];
            YE[0] = YE[6];
            YE[6] = YE[8];
            YE[8] = YE[2];
            YE[2] = buffer_corner;

            buffer_corner = GR[0];
            GR[0] = OR[0];
            OR[0] = BL[0];
            BL[0] = RE[0];
            RE[0] = buffer_corner;

            buffer_corner = GR[2];
            GR[2] = OR[2];
            OR[2] = BL[2];
            BL[2] = RE[2];
            RE[2] = buffer_corner;

            // Movimiento de aristas en la cara
            buffer_edge  = YE[1];
            YE[1] = YE[3];
            YE[3] = YE[7];
            YE[7] = YE[5];
            YE[5] = buffer_edge;

            buffer_edge  = GR[1];
            GR[1] = OR[1];
            OR[1] = BL[1];
            BL[1] = RE[1];
            RE[1] = buffer_edge;

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
            Cube.move.U();
            Cube.move.U();
            Cube.move.U();
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
            Cube.move.U();
            Cube.move.U();
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
Cube.move.U();
Cube.setPositions();
console.log(Cube.positions);
