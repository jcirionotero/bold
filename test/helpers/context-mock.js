class ContextMock {

  getMock () {
    return {
      'instance': {},
      'args': {
        'data': {}
      },
      'Model': {
        'app': {
          'dataSources': {
            'mongods': {
              'connector': {
                'collection': jasmine.createSpy('collection').and.returnValue({
                  'findAndModify': jasmine.createSpy('findAndModify')
                })
              }
            }
          }
        }
      }
    };
  }

}

module.exports = new ContextMock();
