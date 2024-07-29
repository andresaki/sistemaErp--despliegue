export const pedidos = [
    {
        idPedido: 1,
        nombre: "Pedido de Muebles de Sala",
        descripcion: "Juego de sofá, mesa de centro y mesa auxiliar",
        especificacionesCliente:
            "Tapizado en cuero beige, patas de madera maciza",
        estadoProduccion: true, // Completado
        estadoEntrega: false, // No reclamado
        pagado: true,
        costoTotal: 1500000,
        cliente: {
            nombre: "Juan Pérez",
            direccion: "Calle 10 # 15-20",
            telefono: "310 555 1234",
        },
        fechaEntregaEstimada: "2024-05-20",
        fechaPedido: "2024-04-25",
    },
    {
        idPedido: 2,
        nombre: "Pedido de Electrodomésticos",
        descripcion: "Nevera, lavadora y secadora",
        especificacionesCliente: "Marca Samsung, color gris",
        estadoProduccion: false, // En proceso
        estadoEntrega: false, // Reclamado
        pagado: false,
        costoTotal: 2500000,
        cliente: {
            nombre: "María Gómez",
            direccion: "Carrera 7 # 40-50",
            telefono: "312 345 6789",
        },
        fechaEntregaEstimada: "2024-05-15",
        fechaPedido: "2024-04-18",
    },
    {
        idPedido: 3,
        nombre: "Pedido de Ropa",
        descripcion: "Camisa, pantalón y zapatos",
        especificacionesCliente: "Talla M, color azul marino",
        estadoProduccion: false, // Completado
        estadoEntrega: false, // Reclamado
        pagado: true,
        costoTotal: 800000,
        cliente: {
            nombre: "Pedro González",
            direccion: "Avenida 15 # 60-70",
            telefono: "314 789 0123",
        },
        fechaEntregaEstimada: "2024-05-10",
        fechaPedido: "2024-04-22",
    },
    {
        idPedido: 4,
        nombre: "Pedido de Libros",
        descripcion: "2 libros de ficción y 1 libro de historia",
        especificacionesCliente:
            "Autores: Gabriel García Márquez, Yuval Noah Harari",
        estadoProduccion: true, // En proceso
        estadoEntrega: false, // No reclamado
        pagado: true,
        costoTotal: 120000,
        cliente: {
            nombre: "Ana López",
            direccion: "Calle 8 # 30-40",
            telefono: "316 234 5678",
        },
        fechaEntregaEstimada: "2024-05-25",
        fechaPedido: "2024-04-05",
    },
    {
        idPedido: 5,
        nombre: "Pedido de Juguetes",
        descripcion: "Muñeca, carro y juego de mesa",
        especificacionesCliente: "Para niña de 5 años",
        estadoProduccion: true, // Completado
        estadoEntrega: true, // No reclamado
        pagado: false,
        costoTotal: 500000,
        cliente: {
            nombre: "Carlos Ramírez",
            direccion: "Carrera 10 # 50-60",
            telefono: "318 678 9012",
        },
        fechaEntregaEstimada: "2024-05-12",
        fechaPedido: "2024-04-10",
    },
    {
        idPedido: 6,
        nombre: "Pedido de Electrónica",
        descripcion: "Celular, tablet y audífonos",
        especificacionesCliente: "Marca Apple, color negro",
        estadoProduccion: true, // En proceso
        estadoEntrega: true, // Reclamado
        pagado: true,
        costoTotal: 3200000,
        cliente: {
            nombre: "Isabella Rodriguez",
            direccion: "Avenida 20 # 70-80",
            telefono: "320 123 4567",
        },
        fechaEntregaEstimada: "2024-05-17",
        fechaPedido: "2024-04-27",
    },
    {
        idPedido: 7,
        nombre: "Pedido de Muebles de Jardín",
        descripcion: "Mesa y sillas de jardín",
        especificacionesCliente: "Material plástico, color beige",
        estadoProduccion: true, // Completado
        estadoEntrega: true, // No reclamado
        pagado: true,
        costoTotal: 750000,
        cliente: {
            nombre: "David Moreno",
            direccion: "Calle 5 # 20-30",
            telefono: "322 456 7890",
        },
        fechaEntregaEstimada: "2024-05-22",
        fechaPedido: "2024-04-08",
    },
    {
        idPedido: 8,
        nombre: "Pedido de Bicicletas",
        descripcion: "Bicicleta de montaña y bicicleta urbana",
        especificacionesCliente: "Marca Specialized, talla M",
        estadoProduccion: true, // En proceso
        estadoEntrega: true, // No reclamado
        pagado: false,
        costoTotal: 1800000,
        cliente: {
            nombre: "Laura Martínez",
            direccion: "Carrera 15 # 40-50",
            telefono: "324 789 0123",
        },
        fechaEntregaEstimada: "2024-06-03",
        fechaPedido: "2024-04-15",
    },
    {
        idPedido: 9,
        nombre: "Pedido de Artículos Deportivos",
        descripcion: "Zapatos deportivos, tenis y ropa deportiva",
        especificacionesCliente: "Marca Nike, talla S",
        estadoProduccion: true, // Completado
        estadoEntrega: true, // Reclamado
        pagado: true,
        costoTotal: 1100000,
        cliente: {
            nombre: "Andrés Sánchez",
            direccion: "Avenida 25 # 60-70",
            telefono: "326 234 5678",
        },
        fechaEntregaEstimada: "2024-05-19",
        fechaPedido: "2024-04-24",
    },
    {
        idPedido: 10,
        nombre: "Pedido de Cosméticos",
        descripcion: "Labial, base de maquillaje y rímel",
        especificacionesCliente: "Marca L'Oréal, tono natural",
        estadoProduccion: true, // En proceso
        estadoEntrega: true, // No reclamado
        pagado: true,
        costoTotal: 450000,
        cliente: {
            nombre: "Valentina Castro",
            direccion: "Calle 10 # 30-40",
            telefono: "328 678 9012",
        },
        fechaEntregaEstimada: "2024-05-28",
        fechaPedido: "2024-04-06",
    },
];
