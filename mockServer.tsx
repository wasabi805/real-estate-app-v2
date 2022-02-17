import { createServer, Model } from 'miragejs';
export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      users: Model,
    },
    seeds(server) {
      server.create('user', {
        email: 'peterParker@dailyBugle.com',
        password: 'password',
        user:{
            firstName: 'Peter',
            lastName: 'Parker',
            favorites:[]
        }
      });
      server.create('user', {
        email: 'timothy.j.ocampo@gmail.com',
        password: 'password',
        user:{
            firstName: 'Tim',
            lastName: 'Ocampo',
            favorites:[]
        }
      });

      server.create('user', {
        email: 'mattMurdock@nelsonAndMurdock.com',
        password: 'password',
        user:{
            firstName: 'Matt',
            lastName: 'Murdock',
            favorites:[]
        }
      });
    },
    routes() {
      this.namespace = 'api/users';
      
      this.get('/', (schema, request) => {
        return schema.users.all();
      });
      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.users.find(id);
      });
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let user = schema.users.find(id);
        return user.update(newAttrs);
      });
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.users.find(id).destroy();
      });
    },
  });
  return server;
}