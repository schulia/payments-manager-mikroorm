## Running

npm install 

npm run dev

## Testing 

npm test // not working, but if it was, that's how you'd do it 

## Main Endpoints

Create User 

curl --location 'http://localhost:3000/api/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name" : "Your User Name",
    "email" : "useremail@paymentsmanager.com"
}'

Get User Balance 

curl --location --request GET 'http://localhost:3000/api/users/:userId/balance' \

The other endpoints are CRUD endpoints with no business logic


MikroORM 

generate the queries from entities : 
npx mikro-orm schema:create --dump 
npx mikro-orm schema:update --dump 

generate entities from db: 
npx  mikro-orm generate-entities --dump