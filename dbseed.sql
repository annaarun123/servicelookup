\c api

INSERT INTO service (name, description)
  VALUES 
  ('Service1', 'Service1 - service description'), 
  ('Service2', 'Service2 - service description'),
  ('Service3', 'Service3 - service description'),
  ('Service4', 'Service4 - service description'),
  ('Service5', 'Service5 - service description'),
  ('Service6', 'Service6 - service description'),
  ('Service7', 'Service7 - service description');

INSERT INTO version (service_id, name, description, is_latest, is_deprecated)
  VALUES 
  ('1', '0.1', 'First alpha version ', false, true), 
  ('1', '0.2', 'First beta version ', false, false), 
  ('1', '1.0', 'First major version ', true, false),
  ('2', '0.1', '2nd service alpha version ', false, true), 
  ('2', '0.2', '2nd service beta version ', true, false), 
  ('3', '1.0', '3r service First version ', true, false)
  ;

