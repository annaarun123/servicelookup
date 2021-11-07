-- TODO:
-- Create a separate ROLE with PASSWORD
-- Alter permissions for the ROLE to create db
-- Connect as the user role

SELECT 'CREATE DATABASE api'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'api')\gexec


\c api

DROP TABLE IF EXISTS version CASCADE;

DROP TABLE IF EXISTS service CASCADE;

CREATE TABLE service (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(1024)
);


CREATE TABLE version (
  version_id SERIAL PRIMARY KEY,
  service_id INT,
  name VARCHAR(255),
  description VARCHAR(1024),
  is_latest boolean,
  is_deprecated boolean,
  
  CONSTRAINT fk_service
      FOREIGN KEY(service_id) 
	  REFERENCES service(service_id)
);
