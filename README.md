# servicelookup

## Requirements
As a user, I can see an overview of services in my organization. 

Acceptance criteria include:

1. User can see the name, a brief description, and versions available for a given service
1. User can navigate to a given service from its card
1. User can search for a specific service


## Design

### Endpoints

Following API endpoints are to be designed

`GET /services?term=<SEARCH_TERM>&offset=OFFSET<>&limit=<LIMIT`

Response:
```
{
	"services": [
		{
			"service_id": 1,
			"name": "service name",
			"description": "service description",
			"versions": [
				{
					"version_id": 1,
					"service_id": 1,
					"name": "0.1",
					"description": "First alpha version ",
					"is_latest": false,
					"is_deprecated": true
				},
			]
		}
	]
	"nextOffset": 2,
	"total": "7"
}
```


`GET /service/:id`

Response:

```

	{
		"service_id": 1,
		"name": "service name",
		"description": "service description",
		"versions": [
			{
				"version_id": 1,
				"service_id": 1,
				"name": "0.1",
				"description": "First alpha version ",
				"is_latest": false,
				"is_deprecated": true
			},
		]
	}

```

### Data Model

**Service**
```
  service_id INT PRIMARY KEY
  name VARCHAR
  description VARCHAR
```


**Version**

``` 
  version_id INT PRIMARY KEY
  service_id INT FOREIGN KEY
  name VARCHAR
  description VARCHAR
  is_latest boolean
  is_deprecated boolean
```




## Development

### Prerequisites

1. Install Postgres

2. Install nodejs


### Code setup

**Set up prerequisites**

**One- time set up Create DB schema**

Run the `dbsetup.sql` in `psql`

`psql postgres -f dbsetup.sql`

Run the `dbseed.sql` in `psql`

`psql api -f dbseed.sql`


**Install npm packagess**

`npm install`


**Run the app**

`node index.js`




### Test

*GET services* by search query and offset and limit - Returns a list of services along wth versions, and also the total and nextOffset to query for next page of results.

`curl -s "http://localhost:3000/services?offset=0&limit=2&term=service" | python -mjson.tool`


*GET service/:id* by service id - Returns details of the service and versions

`curl -s "http://localhost:3000/service/2" | python -mjson.tool`

