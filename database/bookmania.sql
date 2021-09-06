-- Script BD
-- Base de datos: bookmania
-- Equipo 7


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

-- Tabla books

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `author` varchar(200) NOT NULL,
  `editorial` varchar(200) NOT NULL,
  `rating` float NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `language` varchar(200) NOT NULL,
  `year` int(11) NOT NULL,
  `pages` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `summary` varchar(200) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla categories

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Datos de la tabla categories

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Arte'),
(2, 'Ciencia'),
(3, 'Deportes'),
(4, 'Derecho'),
(5, 'Economía'),
(6, 'Enseñanza Inglés'),
(7, 'Ficción'),
(8, 'Ingeniería'),
(9, 'Infantil'),
(10, 'Informática'),
(11, 'Literatura'),
(12, 'Medicina'),
(13, 'Psicología'),
(14, 'Religión'),
(15, 'Romance');


-- Tabla purchase_orders

CREATE TABLE `purchase_orders` (
  `id` int(11) NOT NULL,
  `purchase_date` date NOT NULL,
  `total` float NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla purchase_order_books

CREATE TABLE `purchase_order_books` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `purchase_order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla users

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `surnames` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `src_image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla user_roles

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de la tabla user_roles

INSERT INTO `user_roles` (`id`, `description`) VALUES
(1, 'Administrador');




-- Primary keys

ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);


ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);


ALTER TABLE `purchase_order_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`),
  ADD KEY `book_id` (`book_id`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);


ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

-- AUTO_INCREMENT de las tablas

ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;


ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;


ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `purchase_order_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- Foreign keys
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);


ALTER TABLE `purchase_orders`
  ADD CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);


ALTER TABLE `purchase_order_books`
  ADD CONSTRAINT `purchase_order_books_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`),
  ADD CONSTRAINT `purchase_order_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);


ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`);
COMMIT;
