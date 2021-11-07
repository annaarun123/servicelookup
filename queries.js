const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'api',
  port: 5432,
})


const MAX_LIMIT=100;

const getVersionsByService = async (service) => {
  const result = await pool.query('SELECT * FROM version WHERE service_id=$1', [service.service_id]);
  let newService=service;
  newService.versions=result.rows;
  return newService;
}

const getServices = async (request, response) => {
  let searchTerm = request.query.term;
  
  let offset=0;
  if(!isNaN(request.query.offset)) {
  	offset= parseInt(request.query.offset);
  }
  
  let limit=MAX_LIMIT;
  if(!isNaN(request.query.limit) && parseInt(request.query.limit)<MAX_LIMIT) {
  	limit= parseInt(request.query.limit);
  }
  
  let serviceRows = {};
  let totalQueryResult = {}; //{rows: [{count: 0}]};
  if(!searchTerm || searchTerm.trim().length==0 ) {
	  serviceRows = await pool.query('SELECT * FROM service ORDER BY service_id ASC OFFSET $1 LIMIT $2', [offset, limit]);
    totalQueryResult = await pool.query('SELECT COUNT(1) FROM service ORDER BY service_id ASC OFFSET $1 LIMIT $2', [offset, limit]);
  } else {
    searchTerm = searchTerm.trim();
    serviceRows = await pool.query("SELECT * FROM service WHERE name LIKE '%"+searchTerm+"%' OR description LIKE '%"+searchTerm+"%' OFFSET $1 LIMIT $2", [offset, limit]);
    totalQueryResult = await pool.query("SELECT COUNT(1) FROM service WHERE name LIKE '%"+searchTerm+"%' OR description LIKE '%"+searchTerm+"%' OFFSET $1 LIMIT $2", [offset, limit]);
  }
  
  const total = (totalQueryResult && totalQueryResult.rows && totalQueryResult.rows[0]) ? totalQueryResult.rows[0].count : 0;

  let promises = serviceRows.rows.map(service=>getVersionsByService(service));
  let servicesResult = await Promise.all(promises);

  const result = {};
  result.services = servicesResult;
  result.nextOffset = Math.min(offset+limit, total);
  result.total = total;
  response.status(200).json(result);
}

const getServiceById = async (request, response) => {
  const id = parseInt(request.params.id)

  const serviceRows = await pool.query('SELECT * FROM service WHERE service_id=$1', [id]);
  
  let promises = serviceRows.rows.map(service=>getVersionsByService(service));
  let servicesResult = await Promise.all(promises);
  response.status(200).json(servicesResult);

}


module.exports = {
  getServices,
  getServiceById,
}

