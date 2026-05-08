-- =====================================
-- PROCEDIMIENTO QUE CUENTA SOLICITUDES
-- =====================================
DELIMITER //

CREATE PROCEDURE ContarExpedientes()
BEGIN

  SELECT COUNT(*) AS NumExpedientes
  FROM solicitud;

END //

DELIMITER ;

CALL ContarExpedientes();
