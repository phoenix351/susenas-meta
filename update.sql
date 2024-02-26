ALTER TABLE `konsumsi` CHANGE `volume_beli` `volume_beli` DECIMAL(10,2) NULL DEFAULT NULL;
ALTER TABLE `konsumsi` CHANGE `volume_produksi` `volume_produksi` DECIMAL(10,2) NULL DEFAULT NULL;
ALTER TABLE `konsumsi` CHANGE `volume_total` `volume_total` DECIMAL(10,2) NULL DEFAULT NULL;
ALTER TABLE `konsumsi_art` CHANGE `volume_beli` `volume_beli` DECIMAL(10,2) NULL DEFAULT NULL;
ALTER TABLE `konsumsi_art` CHANGE `volume_produksi` `volume_produksi` DECIMAL(10,2) NULL DEFAULT NULL;
ALTER TABLE `konsumsi_art` CHANGE `volume_total` `volume_total` DECIMAL(10,2) NULL DEFAULT NULL;


ALTER TABLE `vsusenas_mak` ADD `wtf_6c2` INT NULL AFTER `wtf_6c1`;


select id_art,komoditas.id_kelompok,sum(konsumsi_art.harga_beli) as beli,sum(konsumsi_art.harga_produksi) as produksi 
from `konsumsi_art` 
inner join `anggota_ruta` on `anggota_ruta`.`id` = `konsumsi_art`.`id` 
inner join `komoditas` on `komoditas`.`id` = `konsumsi_art`.`id_komoditas` 
where `id_ruta` = ? group by `id_art`, `komoditas`.`id_kelompok`