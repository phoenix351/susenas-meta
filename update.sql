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


select nks, r109, count(anggota_ruta.id), blok4_32_15_total, blok4_32_16_total, blokqc_1+blokqc_2,blokqc_3
from vsusenas_mak,anggota_ruta
where vsusenas_mak.id = anggota_ruta.id_ruta
group by nks, r109;

-- update 
ALTER TABLE `vsusenas_mak` CHANGE `r108` `r108` VARCHAR(5) NULL DEFAULT NULL;

update vsusenas_mak set status_dok='error' where status_dok='entri';
