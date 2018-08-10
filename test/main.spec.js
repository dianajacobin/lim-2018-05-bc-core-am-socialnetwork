describe('main', () => {
  it('debería exponer función emailValidation en objeto global', () => {
    assert.isFunction(emailValidation);
    });
  it('debería exponer función registroValidation en objeto global', () => {
    assert.isFunction(registroValidation);
    });
describe('emailValidation', () => {
  it('debería retornar true para rosemarie61@gmail.com con password 1234567', () => {
    assert.equal(emailValidation('rosemarie61@gmail.com',1234567), true);
    })
  it('debería retornar false para diana61@45.21 con pasword 1234567', () => {
    assert.equal(emailValidation('diana61@45.21',1234567), false);
    })
  it('debería retornar false para email vacio con pasword vacio', () => {
    assert.equal(emailValidation(' ',''), false);
    })
  });
  describe('registroValidation', () => {
    it('debería retornar true para rosemarie61@gmail.com con password 1234567', () => {
      assert.equal(registroValidation('rosemarie61@gmail.com',1234567), true);
      })
    it('debería retornar false para diana61@45.21 con pasword 1234567', () => {
      assert.equal(registroValidation('diana61@45.21',1234567), false);
      })
    it('debería retornar false para email vacio con pasword vacio', () => {
      assert.equal(registroValidation(' ',''), false);
      })
    });
});
