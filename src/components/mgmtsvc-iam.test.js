import chai, { expect } from 'chai';
import chap from 'chai-as-promised';
import { loadSwagger, getAuthHippie } from './helpers.test';
import promiseEach from 'promise-each';

chai.use(chap);

const isNode = require('detect-node');
let swaggerFile = 'swagger-files/mgmtsvc-iam/swagger.yml';
if (!isNode) {
  swaggerFile = require('../../swagger-files/mgmtsvc-iam/swagger.yml');
}

const testWorkspaceName = 'api-checker-workspace';

describe('/iam (mgmtsvc-iam)', () => {
  let api;
  before(() => loadSwagger(swaggerFile)
      .then((swagger) => {
        api = () => getAuthHippie(swagger);
      }));

  it('GET /login', () => expect(
      api().qs({
        username: 'ncs-iam@hpe.com'
      })
        .get('/rest/iam/auth/login')
        .expectStatus(200)
        .expectBody({ idpUrl: '', authMethod: 'password' })
        .end()
    ).to.be.fulfilled);

  it("returns password login for unknown user 'snarf'", () => expect(
      api().qs({
        username: 'snarf'
      })
        .get('/rest/iam/auth/login')
        .expectStatus(200)
        .expectBody({ idpUrl: '', authMethod: 'password' })
        .end()
    ).to.be.fulfilled);

  it('POST /login', () => expect(
      api().send({
        username: 'ncs-iam@hpe.com',
        password: 'hpe admin',
      })
        .post('/rest/iam/auth/login')
        .expectStatus(200)
        .end()
    ).to.be.fulfilled);

  it('GET /userInfo', () => expect(
      api().get('/rest/iam/userInfo')
        .expectStatus(200)
        .expectBody({
          userId: '0eb98dc8-4a0d-4d17-8ac6-e53bbea9d76c',
          username: 'ncs-iam@hpe.com',
          provider: '',
          providerDescription: '',
          customerId: '3564760a-3dd4-4ae9-bd66-18d442fd758c',
          customerName: 'HPE'
        })
        .end()
    ).to.be.fulfilled);

  it('GET /workspaces', () => expect(
      api()
        .get('/rest/iam/workspaces/')
        .expectStatus(200)
        .end()
    ).to.be.fulfilled);

  describe('CRUD workspaces', () => {
    let workspaceId;

    // In case something went wrong with a prior version of the test, cleanup the
    // api-checker-workspace

    // TODO This won't support multiple users running this test simultaneously
    // the test creates a single named workspace no matter who is running it
    before(() => {
      api().get('/rest/iam/workspaces/')
        .expectStatus(200)
        .end()
        .then(result => JSON.parse(result.toJSON().body).members)
        .then(workspaces => Promise.resolve(workspaces)
            .then(promiseEach((workspace) => {
              if (workspace.name.includes(testWorkspaceName)) {
                return api().del('/rest/iam/workspaces/{id}')
                  .pathParams({
                    id: workspace.id,
                  })
                  .end();
              }
              return Promise.resolve();
            })));
    });

    it('POST /workspaces', () => expect(
        api().post('/rest/iam/workspaces/')
          .send({
            name: testWorkspaceName,
            id: 'UNNEEDED ID',
          })
          .expectStatus(201)
          .end()
          .then((result) => {
            workspaceId = JSON.parse(result.toJSON().body).id;
          })
      ).to.be.fulfilled);

    it('GET /workspaces/{id}', () => expect(
        api().get('/rest/iam/workspaces/{id}')
          .pathParams({
            id: workspaceId,
          })
          .expectStatus(200)
          .end()
      ).to.be.fulfilled);

    it('DELETE /workspaces/{id}', () => expect(
        api().del('/rest/iam/workspaces/{id}')
          .pathParams({
            id: workspaceId,
          })
          .expectStatus(204)
          .end()
      ).to.be.fulfilled);
  });

  describe('cloud providers', () => {
    it('GET /cloud-providers', () => expect(
        api().get('/rest/iam/cloud-providers/')
          .expectStatus(200)
          .end()
      ).to.be.fulfilled);

    it('POST /cloud-providers/ handles invalid keys', () => expect(
          api().post('/rest/iam/cloud-providers/')
            .send({
              provider: 'azure',
              accessKeyId: 'test-key-id',
              accessKey: 'test-key',
            })
            .expectStatus(400)
            .end()
        ).to.be.fulfilled);

    describe.skip('CRUD', () => {
      let cloudProviderId;

      before('Azure credentials must be set in environment variables AZURE_ACCESS_KEY_ID and AZURE_ACCESS_KEY', function () {
        if (!process.env.AZURE_ACCESS_KEY_ID ||
            !process.env.AZURE_ACCESS_KEY) {
          this.skip();
        }
      });

      it('POST /cloud-providers/', () => expect(
          api().post('/rest/iam/cloud-providers/')
            .send({
              provider: 'azure',
              accessKeyId: process.env.AZURE_ACCESS_KEY_ID + 7,
              accessKey: process.env.AZURE_ACCESS_KEY,
            })
            .expectStatus(201)
            .expectKey('accessKeyId')
            .expectKey('accessKey')
            .expectKey('id')
            .end()
            .then((result) => {
              cloudProviderId = JSON.parse(result.toJSON().body).id;
            })
        ).to.be.fulfilled);

      it('GET /cloud-providers/{id}', () => expect(
          api().get('/rest/iam/cloud-providers/{id}')
            .pathParams({
              id: cloudProviderId
            })
            .expectStatus(200)
            .end()
        ).to.be.fulfilled);

      it('DELETE /cloud-providers/{id}', () => expect(
          api().del('/rest/iam/cloud-providers/{id}')
            .pathParams({
              id: cloudProviderId,
            })
            .expectStatus(204)
            .end()
        ).to.be.fulfilled);
    });
  });
})
;
