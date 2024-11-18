

 "use strict"
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


class Cube_3x3 {
    
    colors = {
        YE: '',
        WH: '',
        GR: '',
        BL: '',
        OR: '',
        RE: ''
    }

    state = {
        YE: [
            'YE','YE','YE',
            'YE','YE','YE',
            'YE','YE','YE'
        ],
        WH: [
            'WH','WH','WH',
            'WH','WH','WH',
            'WH','WH','WH'
        ],
        GR: [
            'GR','GR','GR',
            'GR','GR','GR',
            'GR','GR','GR'
        ],
        BL: [
            'BL','BL','BL',
            'BL','BL','BL',
            'BL','BL','BL'
        ],
        RE: [
            'RE','RE','RE',
            'RE','RE','RE',
            'RE','RE','RE'
        ],
        OR: [
            'OR','OR','OR',
            'OR','OR','OR',
            'OR','OR','OR'
        ]
    };

    status = {
        edges_solved: 0,
        corners_solved: 0,
        centers_solved: 0,
        isSolved: false,
        edges: {
            BUFFER: false, // Aristas
            AB: false,
            CD: false,
            EF: false,
            GH: false,
            IJ: false,
            KL: false,
            MN: false,
            OP: false,
            QR: false,
            ST: false,
            UV: false
        },
        corners: {
            buffer: false, // Esquinas
            aip: false,
            bqj: false,
            coh: false,
            dsk: false,
            elt: false,
            fum: false,
            gnr: false
        },
        centers: {
            CY: false, // Centros
            CG: false,
            CR: false,
            CO: false,
            CB: false,
            CW: false
        },
        updateStatus: ()=>{

            // Validaciónes

            const _BUFFER = Cube.positions.BUFFER[0] === Cube.finalPositions.BUFFER[0] && Cube.positions.BUFFER[1] === Cube.finalPositions.BUFFER[1];
            const _AB     = Cube.positions.AB[0] === Cube.finalPositions.AB[0] && Cube.positions.AB[1] === Cube.finalPositions.AB[1];
            const _CD     = Cube.positions.CD[0] === Cube.finalPositions.CD[0] && Cube.positions.CD[1] === Cube.finalPositions.CD[1];
            const _EF     = Cube.positions.EF[0] === Cube.finalPositions.EF[0] && Cube.positions.EF[1] === Cube.finalPositions.EF[1];
            const _GH     = Cube.positions.GH[0] === Cube.finalPositions.GH[0] && Cube.positions.GH[1] === Cube.finalPositions.GH[1];
            const _IJ     = Cube.positions.IJ[0] === Cube.finalPositions.IJ[0] && Cube.positions.IJ[1] === Cube.finalPositions.IJ[1];
            const _KL     = Cube.positions.KL[0] === Cube.finalPositions.KL[0] && Cube.positions.KL[1] === Cube.finalPositions.KL[1];
            const _MN     = Cube.positions.MN[0] === Cube.finalPositions.MN[0] && Cube.positions.MN[1] === Cube.finalPositions.MN[1];
            const _OP     = Cube.positions.OP[0] === Cube.finalPositions.OP[0] && Cube.positions.OP[1] === Cube.finalPositions.OP[1];
            const _QR     = Cube.positions.QR[0] === Cube.finalPositions.QR[0] && Cube.positions.QR[1] === Cube.finalPositions.QR[1];
            const _ST     = Cube.positions.ST[0] === Cube.finalPositions.ST[0] && Cube.positions.ST[1] === Cube.finalPositions.ST[1];
            const _UV     = Cube.positions.UV[0] === Cube.finalPositions.UV[0] && Cube.positions.UV[1] === Cube.finalPositions.UV[1];

            const _buffer = Cube.positions.buffer[0] === Cube.finalPositions.buffer[0] && Cube.positions.buffer[1] === Cube.finalPositions.buffer[1] && Cube.positions.buffer[2] === Cube.finalPositions.buffer[2];
            const _aip    = Cube.positions.aip[0] === Cube.finalPositions.aip[0] && Cube.positions.aip[1] === Cube.finalPositions.aip[1] && Cube.positions.aip[2] === Cube.finalPositions.aip[2];
            const _bqj    = Cube.positions.bqj[0] === Cube.finalPositions.bqj[0] && Cube.positions.bqj[1] === Cube.finalPositions.bqj[1] && Cube.positions.bqj[2] === Cube.finalPositions.bqj[2];
            const _coh    = Cube.positions.coh[0] === Cube.finalPositions.coh[0] && Cube.positions.coh[1] === Cube.finalPositions.coh[1] && Cube.positions.coh[2] === Cube.finalPositions.coh[2];
            const _dsk    = Cube.positions.dsk[0] === Cube.finalPositions.dsk[0] && Cube.positions.dsk[1] === Cube.finalPositions.dsk[1] && Cube.positions.dsk[2] === Cube.finalPositions.dsk[2];
            const _elt    = Cube.positions.elt[0] === Cube.finalPositions.elt[0] && Cube.positions.elt[1] === Cube.finalPositions.elt[1] && Cube.positions.elt[2] === Cube.finalPositions.elt[2];
            const _fum    = Cube.positions.fum[0] === Cube.finalPositions.fum[0] && Cube.positions.fum[1] === Cube.finalPositions.fum[1] && Cube.positions.fum[2] === Cube.finalPositions.fum[2];
            const _gnr    = Cube.positions.gnr[0] === Cube.finalPositions.gnr[0] && Cube.positions.gnr[1] === Cube.finalPositions.gnr[1] && Cube.positions.gnr[2] === Cube.finalPositions.gnr[2];

            const _CY = Cube.positions.CY === Cube.finalPositions.CY;
            const _CG = Cube.positions.CG === Cube.finalPositions.CG;
            const _CR = Cube.positions.CR === Cube.finalPositions.CR;
            const _CO = Cube.positions.CO === Cube.finalPositions.CO;
            const _CB = Cube.positions.CB === Cube.finalPositions.CB;
            const _CW = Cube.positions.CW === Cube.finalPositions.CW;

            // Actualizar el status

            if( _BUFFER && _AB && _CD && _EF && _GH && _IJ && _KL && _MN && _OP && _QR && _ST && _UV && _buffer && _aip && _bqj && _coh && _dsk && _elt && _fum && _gnr ) Cube.status.isSolved = true;
            
            if( _BUFFER ) Cube.status.edges.BUFFER = true;
            if( _AB ) Cube.status.edges.AB = true;
            if( _CD ) Cube.status.edges.CD = true;
            if( _EF ) Cube.status.edges.EF = true;
            if( _GH ) Cube.status.edges.GH = true;
            if( _IJ ) Cube.status.edges.IJ = true;
            if( _KL ) Cube.status.edges.KL = true;
            if( _MN ) Cube.status.edges.MN = true;
            if( _OP ) Cube.status.edges.OP = true;
            if( _QR ) Cube.status.edges.QR = true;
            if( _ST ) Cube.status.edges.ST = true;
            if( _UV ) Cube.status.edges.UV = true;

            if( _buffer ) Cube.status.corners.buffer = true;
            if( _aip ) Cube.status.corners.aip = true;
            if( _bqj ) Cube.status.corners.bqj = true;
            if( _coh ) Cube.status.corners.coh = true;
            if( _dsk ) Cube.status.corners.dsk = true;
            if( _elt ) Cube.status.corners.elt = true;
            if( _fum ) Cube.status.corners.fum = true;
            if( _gnr ) Cube.status.corners.gnr = true;

            if( _CY ) Cube.status.centers.CY = true;
            if( _CG ) Cube.status.centers.CG = true;
            if( _CR ) Cube.status.centers.CR = true;
            if( _CO ) Cube.status.centers.CO = true;
            if( _CB ) Cube.status.centers.CB = true;
            if( _CW ) Cube.status.centers.CW = true;
            
        }
    };

    positions = {
        buffer: [], // Esquinas
        aip: [],
        bqj: [],
        coh: [],
        dsk: [],
        elt: [],
        fum: [],
        gnr: [],
        BUFFER: [], // Aristas
        AB: [],
        CD: [],
        EF: [],
        GH: [],
        IJ: [],
        KL: [],
        MN: [],
        OP: [],
        QR: [],
        ST: [],
        UV: [],
        CY: '', // Centros
        CG: '',
        CR: '',
        CO: '',
        CB: '',
        CW: ''
    };

    finalPositions = {
        buffer: [ 'YE', 'BL', 'RE' ], // Esquinas
        aip: [ 'YE', 'GR', 'OR' ],   
        bqj: [ 'YE', 'OR', 'BL' ],   
        coh: [ 'YE', 'RE', 'GR' ],   
        dsk: [ 'WH', 'RE', 'GR' ],   
        elt: [ 'WH', 'GR', 'OR' ],   
        fum: [ 'WH', 'OR', 'BL' ],
        gnr: [ 'WH', 'BL', 'RE' ],
        BUFFER: [ 'YE', 'OR' ], // Aristas
        AB: [ 'YE', 'RE' ],
        CD: [ 'YE', 'GR' ],
        EF: [ 'YE', 'BL' ],
        GH: [ 'RE', 'GR' ],
        IJ: [ 'GR', 'OR' ],
        KL: [ 'OR', 'BL' ],
        MN: [ 'BL', 'RE' ],
        OP: [ 'RE', 'WH' ],
        QR: [ 'GR', 'WH' ],
        ST: [ 'OR', 'WH' ],
        UV: [ 'BL', 'WH' ],
        CY: 'YE', // Centros
        CG: 'GR',
        CR: 'RE',
        CO: 'OR',
        CB: 'BL',
        CW: 'WH'
    };

    setPositions = () => {

        let { YE, WH, GR, BL, RE, OR } = Cube.state;
        
        Cube.positions.buffer = [YE[0],BL[2],RE[0]];
        Cube.positions.aip    = [YE[8],GR[2],OR[0]];
        Cube.positions.bqj    = [YE[2],OR[2],BL[0]];
        Cube.positions.coh    = [YE[6],RE[2],GR[0]];
        Cube.positions.dsk    = [WH[0],RE[8],GR[6]];
        Cube.positions.elt    = [WH[2],GR[8],OR[6]];
        Cube.positions.fum    = [WH[8],OR[8],BL[6]];
        Cube.positions.gnr    = [WH[6],BL[8],RE[6]];
        Cube.positions.BUFFER = [YE[5],OR[1]];
        Cube.positions.AB     = [YE[3],RE[1]];
        Cube.positions.CD     = [YE[7],GR[1]];
        Cube.positions.EF     = [YE[1],BL[1]];
        Cube.positions.GH     = [RE[5],GR[3]];
        Cube.positions.IJ     = [GR[5],OR[3]];
        Cube.positions.KL     = [OR[5],BL[3]];
        Cube.positions.MN     = [BL[5],RE[3]];
        Cube.positions.OP     = [RE[7],WH[3]];
        Cube.positions.QR     = [GR[7],WH[1]];
        Cube.positions.ST     = [OR[7],WH[5]];
        Cube.positions.UV     = [BL[7],WH[7]];
        Cube.positions.CY     = YE[4];
        Cube.positions.CG     = GR[4];
        Cube.positions.CR     = RE[4];
        Cube.positions.CO     = OR[4];
        Cube.positions.CB     = BL[4];
        Cube.positions.CW     = WH[4];

    };

    move = {
        U: ()=>{

            let { YE, GR, RE, BL, OR } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas
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

            // Movimiento de aristas
            buffer_edge = YE[1];
            YE[1] = YE[3];
            YE[3] = YE[7];
            YE[7] = YE[5];
            YE[5] = buffer_edge;

            buffer_edge = GR[1];
            GR[1] = OR[1];
            OR[1] = BL[1];
            BL[1] = RE[1];
            RE[1] = buffer_edge;

        },
        L: ()=>{

            let { RE, YE, GR, WH, BL } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas
            buffer_corner = RE[0];
            RE[0] = RE[6];
            RE[6] = RE[8];
            RE[8] = RE[2];
            RE[2] = buffer_corner;

            buffer_corner = YE[0];
            YE[0] = BL[8];
            BL[8] = WH[0];
            WH[0] = GR[0];
            GR[0] = buffer_corner;

            buffer_corner = YE[6];
            YE[6] = BL[2];
            BL[2] = WH[6];
            WH[6] = GR[6];
            GR[6] = buffer_corner;

            // Movimiento de aristas
            buffer_edge = RE[1];
            RE[1] = RE[3];
            RE[3] = RE[7];
            RE[7] = RE[5];
            RE[5] = buffer_edge;

            buffer_edge = YE[3];
            YE[3] = BL[5];
            BL[5] = WH[3];
            WH[3] = GR[3];
            GR[3] = buffer_edge;

        },
        D: ()=>{

            let { WH, GR, OR, BL, RE } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas
            buffer_corner = WH[0];
            WH[0] = WH[6];
            WH[6] = WH[8];
            WH[8] = WH[2];
            WH[2] = buffer_corner;

            buffer_corner = GR[6];
            GR[6] = RE[6];
            RE[6] = BL[6];
            BL[6] = OR[6];
            OR[6] = buffer_corner;
            
            buffer_corner = GR[8];
            GR[8] = RE[8];
            RE[8] = BL[8];
            BL[8] = OR[8];
            OR[8] = buffer_corner;

            // Movimiento de aristas
            buffer_edge = WH[1];
            WH[1] = WH[3];
            WH[3] = WH[7];
            WH[7] = WH[5];
            WH[5] = buffer_edge;

            buffer_edge = GR[7];
            GR[7] = RE[7];
            RE[7] = BL[7];
            BL[7] = OR[7];
            OR[7] = buffer_edge;

        },
        R: ()=>{

            let { OR, GR, WH, BL, YE } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas
            buffer_corner = OR[0];
            OR[0] = OR[6];
            OR[6] = OR[8];
            OR[8] = OR[2];
            OR[2] = buffer_corner;

            buffer_corner = GR[2];
            GR[2] = WH[2];
            WH[2] = BL[6];
            BL[6] = YE[2];
            YE[2] = buffer_corner;

            buffer_corner = GR[8];
            GR[8] = WH[8];
            WH[8] = BL[0];
            BL[0] = YE[8];
            YE[8] = buffer_corner;

            // Movimiento de aristas
            buffer_edge = OR[1];
            OR[1] = OR[3];
            OR[3] = OR[7];
            OR[7] = OR[5];
            OR[5] = buffer_edge;

            buffer_edge = GR[5];
            GR[5] = WH[5];
            WH[5] = BL[3];
            BL[3] = YE[5];
            YE[5] = buffer_edge;

        },
        B: ()=>{
            
            let { BL, YE, OR, WH, RE } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas
            buffer_corner = BL[0];
            BL[0] = BL[6];
            BL[6] = BL[8];
            BL[8] = BL[2];
            BL[2] = buffer_corner;       
            
            buffer_corner = YE[0];
            YE[0] = OR[2];
            OR[2] = WH[8];
            WH[8] = RE[6];
            RE[6] = buffer_corner;

            buffer_corner = YE[2];
            YE[2] = OR[8];
            OR[8] = WH[6];
            WH[6] = RE[0];
            RE[0] = buffer_corner;

            // Movimiento de aristas
            buffer_edge = BL[1];
            BL[1] = BL[3];
            BL[3] = BL[7];
            BL[7] = BL[5];
            BL[5] = buffer_edge;

            buffer_edge = YE[1];
            YE[1] = OR[5];
            OR[5] = WH[7];
            WH[7] = RE[3];
            RE[3] = buffer_edge;

        },
        F: ()=>{

            let { GR, YE, OR, WH, RE } = Cube.state;

            let buffer_corner;
            let buffer_edge;

            // Movimiento de esquinas
            buffer_corner = GR[0];
            GR[0] = GR[6];
            GR[6] = GR[8];
            GR[8] = GR[2];
            GR[2] = buffer_corner;    

            buffer_corner = YE[6];
            YE[6] = RE[8];
            RE[8] = WH[2];
            WH[2] = OR[0];
            OR[0] = buffer_corner;

            buffer_corner = YE[8];
            YE[8] = RE[2];
            RE[2] = WH[0];
            WH[0] = OR[6];
            OR[6] = buffer_corner;

            // Movimiento de aristas
            buffer_edge = GR[1];
            GR[1] = GR[3];
            GR[3] = GR[7];
            GR[7] = GR[5];
            GR[5] = buffer_edge;

            buffer_edge = YE[7];
            YE[7] = RE[5];
            RE[5] = WH[1];
            WH[1] = OR[3];
            OR[3] = buffer_edge;

        },
        E: ()=>{

            let { GR, OR, BL, RE } = Cube.state;

            let buffer_edge;
            let buffer_center;

            // Movimiento de aristas
            buffer_edge = GR[3];
            GR[3] = RE[3];
            RE[3] = BL[3];
            BL[3] = OR[3];
            OR[3] = buffer_edge;

            buffer_edge = GR[5];
            GR[5] = RE[5];
            RE[5] = BL[5];
            BL[5] = OR[5];
            OR[5] = buffer_edge;

            // Movimiento de centros
            buffer_center = GR[4];
            GR[4] = RE[4];
            RE[4] = BL[4];
            BL[4] = OR[4];
            OR[4] = buffer_center;

        },
        M: ()=>{

            let { YE, GR, WH, BL } = Cube.state;

            let buffer_edge;
            let buffer_center;

            // Movimiento de aristas
            buffer_edge = YE[1];
            YE[1] = BL[7];
            BL[7] = WH[1];
            WH[1] = GR[1];
            GR[1] = buffer_edge;

            buffer_edge = YE[7];
            YE[7] = BL[1];
            BL[1] = WH[7];
            WH[7] = GR[7];
            GR[7] = buffer_edge;

            // Movimiento de centros
            buffer_center = YE[4];
            YE[4] = BL[4];
            BL[4] = WH[4];
            WH[4] = GR[4];
            GR[4] = buffer_center;

        },
        S: ()=>{

            let { YE, OR, WH, RE } = Cube.state;

            let buffer_edge;
            let buffer_center;

            // Movimiento de aristas
            buffer_edge = YE[3];
            YE[3] = RE[7];
            RE[7] = WH[5];
            WH[5] = OR[1];
            OR[1] = buffer_edge;

            buffer_edge = YE[5];
            YE[5] = RE[1];
            RE[1] = WH[3];
            WH[3] = OR[7];
            OR[7] = buffer_edge;

            // Movimiento de centros
            buffer_center = YE[4];
            YE[4] = RE[4];
            RE[4] = WH[4];
            WH[4] = OR[4];
            OR[4] = buffer_center;

        },
        Up: ()=>{
            Cube.move.U();
            Cube.move.U();
            Cube.move.U();
        },
        Lp: ()=>{
            Cube.move.L();
            Cube.move.L();
            Cube.move.L();
        },
        Dp: ()=>{
            Cube.move.D();
            Cube.move.D();
            Cube.move.D();
        },
        Rp: ()=>{
            Cube.move.R();
            Cube.move.R();
            Cube.move.R();
        },
        Bp: ()=>{
            Cube.move.B();
            Cube.move.B();
            Cube.move.B();
        },
        Fp: ()=>{
            Cube.move.F();
            Cube.move.F();
            Cube.move.F();
        },
        Ep: ()=>{
            Cube.move.E();
            Cube.move.E();
            Cube.move.E();
        },
        Mp: ()=>{
            Cube.move.M();
            Cube.move.M();
            Cube.move.M();
        },
        Sp: ()=>{
            Cube.move.S();
            Cube.move.S();
            Cube.move.S();
        },
        U2: ()=>{
            Cube.move.U();
            Cube.move.U();
        },
        L2: ()=>{
            Cube.move.L();
            Cube.move.L();
        },
        D2: ()=>{
            Cube.move.D();
            Cube.move.D();
        },
        R2: ()=>{
            Cube.move.R();
            Cube.move.R();
        },
        B2: ()=>{
            Cube.move.B();
            Cube.move.B();
        },
        F2: ()=>{
            Cube.move.F();
            Cube.move.F();
        },
        E2: ()=>{
            Cube.move.E();
            Cube.move.E();
        },
        M2: ()=>{
            Cube.move.M();
            Cube.move.M();
        },
        S2: ()=>{
            Cube.move.S();
            Cube.move.S();
        },
        algorithm: (algorithm)=>{

            const algMoves = algorithm.split(' ');

            for( let m = 0; m < algMoves.length; m++ ){
                
                switch (algMoves[m]) {
                    case 'U':  Cube.move.U();  break;
                    case 'Up': Cube.move.Up(); break;
                    case 'U2': Cube.move.U2(); break;
                    case 'L':  Cube.move.L();  break;
                    case 'Lp': Cube.move.Lp(); break;
                    case 'L2': Cube.move.L2(); break;
                    case 'D':  Cube.move.D();  break;
                    case 'Dp': Cube.move.Dp(); break;
                    case 'D2': Cube.move.D2(); break;
                    case 'R':  Cube.move.R();  break;
                    case 'Rp': Cube.move.Rp(); break;
                    case 'R2': Cube.move.R2(); break;
                    case 'F':  Cube.move.F();  break;
                    case 'Fp': Cube.move.Fp(); break;
                    case 'F2': Cube.move.F2(); break;
                    case 'B':  Cube.move.B();  break;
                    case 'Bp': Cube.move.Bp(); break;
                    case 'B2': Cube.move.B2(); break;
                    case 'E':  Cube.move.E();  break;
                    case 'Ep': Cube.move.Ep(); break;
                    case 'E2': Cube.move.E2(); break;
                    case 'M':  Cube.move.M();  break;
                    case 'Mp': Cube.move.Mp(); break;
                    case 'M2': Cube.move.M2(); break;
                    case 'S':  Cube.move.S();  break;
                    case 'Sp': Cube.move.Sp(); break;
                    case 'S2': Cube.move.S2(); break;
                    default: break;
                }

            }

        }
        
    };

    solve = {
        blind: ()=>{
            
        }
    };

    algorithms = {
        blind: {

        }
    };

};

const cubo = new Cube_3x3();

console.log(cubo.state);

