use records_db;
DROP TRIGGER IF EXISTS insert_record_trigger;

DELIMITER // 
CREATE TRIGGER insert_record_trigger AFTER INSERT ON record
FOR EACH ROW
BEGIN
  INSERT INTO tracklist (record_id) VALUES (NEW.id);
  INSERT INTO opinion (record_id) VALUES (NEW.id);
  INSERT INTO cover (record_id) VALUES (NEW.id);

END;

//

DELIMITER ;
