-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2020 at 06:39 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tv.net`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `accounts_id` varchar(100) NOT NULL,
  `accounts_name` varchar(100) NOT NULL,
  `accounts_username` varchar(100) NOT NULL,
  `accounts_password` varchar(100) NOT NULL,
  `accounts_service` varchar(100) NOT NULL,
  `accounts_join_date` varchar(100) NOT NULL,
  `accounts_lat` varchar(100) NOT NULL,
  `accounts_long` varchar(100) NOT NULL,
  `accounts_status` int(11) NOT NULL,
  `accounts_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accounts_id`, `accounts_name`, `accounts_username`, `accounts_password`, `accounts_service`, `accounts_join_date`, `accounts_lat`, `accounts_long`, `accounts_status`, `accounts_note`) VALUES
('CUS28179857', 'Chrisdityra Lengkey', '', '', 'S121213', '11-11-2020', '1.0489904766324258', '124.31738700906698', 400, ''),
('CUS55620713', 'Cleon', '', '', 'S1312121', '11-11-2020', '1.04027444863614', '124.31357981793155', 400, ''),
('CUS99423339', 'Iman', '', '', 'Tes', '11/11/2020', '23231323', '23232323', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` varchar(100) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_nominal` int(11) NOT NULL,
  `service_information` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_name`, `service_nominal`, `service_information`) VALUES
('S121213', 'Telko', 600000, ''),
('S1312121', 'Phoenix', 50000, '');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` varchar(100) NOT NULL,
  `transaction_customer_id` varchar(100) NOT NULL,
  `transaction_officer_id` varchar(100) NOT NULL,
  `transaction_nominal` int(11) NOT NULL,
  `transaction_month` int(11) NOT NULL,
  `transaction_year` int(11) NOT NULL,
  `transaction_status` varchar(200) NOT NULL,
  `transaction_notes` varchar(200) NOT NULL,
  `transaction_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `transaction_customer_id`, `transaction_officer_id`, `transaction_nominal`, `transaction_month`, `transaction_year`, `transaction_status`, `transaction_notes`, `transaction_admin`) VALUES
('TRC47127647', 'CUS28179857', '', 600000, 10, 2020, '400', 'PEMASANGAN BARU', 50000),
('TRC76973934', 'CUS55620713', '', 50000, 10, 2020, '400', 'PEMASANGAN BARU', 50000);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `trx_detail_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `trx_payment_month` varchar(100) NOT NULL,
  `trx_payment_nominal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`accounts_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`trx_detail_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `trx_detail_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
