-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2025 a las 07:51:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_integrador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`) VALUES
(1, 'Gonzalo', 'gonzalo@utn.com', '0h8vNufy'),
(2, 'Ignacio', 'ignacio@utn.com', '12345678');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_type` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `image` varchar(500) NOT NULL,
  `desc_number` int(11) NOT NULL,
  `desc_text` varchar(50) NOT NULL,
  `quality` varchar(20) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `product_type`, `active`, `image`, `desc_number`, `desc_text`, `quality`, `price`) VALUES
(1, 'Camiseta', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9vhkSJqesbmdGO2M4OIS0fGLOElAU7PHAuw&s', 10, 'Messi', 'Jugador', 200000),
(2, 'Camiseta', 1, 'https://www.aisope.com.ar/images/HZQM/NDBH0564.jpg', 11, 'DI MARIA', 'Hincha', 50000),
(3, 'Camiseta', 0, 'https://acdn-us.mitiendanube.com/stores/001/312/744/products/whatsapp-image-2024-09-09-at-10-31-52-1-ffc10134c5a20d4a5417259068552954-240-0.jpeg', 9, 'J. ALVAREZ', 'Hincha', 45000),
(4, 'Botines', 1, 'https://http2.mlstatic.com/D_Q_NP_863141-MLA79275859286_092024-R.webp', 42, 'Nike Phantom', 'Sintético', 75000),
(5, 'Botines', 1, 'https://sporting.vtexassets.com/arquivos/ids/1523338-800-800?v=638654498102370000&width=800&height=800&aspect=true', 41, 'Puma Future 7', 'Césped', 70000),
(6, 'Botines', 1, 'https://sportotalar.vtexassets.com/arquivos/ids/596103/IF6341-1074-PLAMET-AURBLA-TURBO_1.png', 40, 'Adidas Predator', 'Sintético', 95000),
(7, 'Camiseta', 1, 'https://acdn-us.mitiendanube.com/stores/001/613/085/products/4f43a82b-727d-4d25-90ee-3f290878-181d9802d81a9fe76e17477657845306-1024-1024.jpg', 10, 'MUNIAIN', 'Jugador', 100000),
(8, 'Camiseta', 1, 'https://acdn-us.mitiendanube.com/stores/002/148/125/products/photo1684281378-11-37f257aecf3fd98a0116843730893548-640-0.jpeg', 23, 'Dibu Martínez', 'Hincha', 60000),
(9, 'Camiseta', 1, 'https://www.aisope.com.ar/images/ACQM/SAH4104.jpg', 30, 'Mastantuono', 'Jugador', 70000),
(10, 'Camiseta', 1, 'https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/d/f/dfa49e8e21e1bf36973f0c3ca43eab4945f165d549e17e4b5a38174f708145ac.jpeg', 3, 'Piqué', 'Hincha', 45000),
(11, 'Botines', 1, 'https://factorydeportivoar.vteximg.com.br/arquivos/ids/196655-700-700/02025735380_0.jpg', 44, 'Topper Titanium', 'Sintético', 78500),
(12, 'Botines', 0, 'https://tiendapodium.com.ar/wp-content/uploads/2023/05/K-K1321J6UWKROO-Botines-De-Futbol-Kappa-Legend-11-Hombre-Rojo-Blanco.jpg', 40, 'Kappa Legend', 'Sintético', 125000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `id_ticket`, `id_product`, `quantity`, `subtotal`) VALUES
(1, 1, 1, 1, 200000),
(2, 1, 5, 1, 70000),
(3, 2, 3, 3, 750000),
(4, 3, 7, 1, 100000),
(5, 3, 5, 2, 140000),
(6, 4, 10, 3, 135000),
(7, 4, 11, 1, 78500),
(8, 5, 1, 1, 200000),
(9, 5, 7, 1, 100000),
(10, 6, 6, 1, 95000),
(11, 6, 8, 1, 60000),
(12, 7, 5, 1, 70000),
(13, 7, 2, 1, 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `client` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `client`, `date`, `total`) VALUES
(1, 'Marta Minujín', '2025-07-10 22:51:08', 270000),
(2, 'Ricardo Darín', '2025-07-11 01:18:25', 750000),
(3, 'Eddie Van Halen', '2025-07-11 02:37:44', 240000),
(4, 'Shakira', '2022-06-04 10:45:55', 213500),
(5, 'Carlos el topo que gira', '2025-07-11 02:47:47', 300000),
(6, 'Rafa de Domínico', '2025-07-11 02:50:10', 155000),
(7, 'Mario Pergolini', '2025-07-11 02:51:14', 120000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_ticket` (`id_ticket`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`id_ticket`) REFERENCES `tickets` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
