-- query konsumsi art
SELECT 
    kode_kabkot,
    nks,
    r109,
    status_dok,
    konsumsi_art.*,
    komoditas.kalori * (konsumsi_art.volume_beli + konsumsi_art.volume_produksi) AS total_kalori
FROM 
    konsumsi_art
JOIN 
    anggota_ruta ON konsumsi_art.id_art = anggota_ruta.id
JOIN 
    vsusenas_mak ON anggota_ruta.id_ruta = vsusenas_mak.id
JOIN 
    komoditas ON komoditas.id = konsumsi_art.id_komoditas
WHERE 
    (konsumsi_art.volume_beli > 0 OR konsumsi_art.volume_produksi > 0) 
    AND vsusenas_mak.status_dok = 'clean';


-- query konsumsi_ruta
SELECT 
    kode_kabkot,
    nks,
    r109,
    status_dok,
    konsumsi.*,
    komoditas.kalori * (konsumsi.volume_beli + konsumsi.volume_produksi) AS total_kalori
FROM 
    konsumsi

JOIN 
    vsusenas_mak ON konsumsi.id_ruta = vsusenas_mak.id
JOIN 
    komoditas ON komoditas.id = konsumsi.id_komoditas
WHERE 
    (konsumsi.volume_beli > 0 OR konsumsi.volume_produksi > 0) 
    AND vsusenas_mak.status_dok = 'clean';
