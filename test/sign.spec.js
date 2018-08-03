describe('validation', () => {
    it('debería exponer función loginSign en objeto global', () => {
      assert.isFunction(loginSign);
    });
    it('debería exponer función passwordLength en objeto global', () => {
      assert.isFunction(passwordLength);
    });

    describe('loginSign(email)', () => {
      it('debería retornar true para rosemarie61@gmail.com', () => {
        assert.equal(validateEmail('rosemarie61@gmail.com'), true);
      })
      it('debería retornar false para rosemarie61@gmail.com', () => {
        assert.equal(validateEmail('rosemarie61@gmail.com'), false);
      })
    });
    describe('passwordLength', () => {
      it('deberia devolver true para QWE67yp.', () => {
        assert.deepEqual(passwordLength('QWE67yp.'),true)
      })
      it('deberia devolver false para 67yp', () => {
        assert.deepEqual(passwordLength('67yp'),false)
      })
    });
    describe('passwordRepeatValid', () => {
      it('deberia devolver true para QWE67yp y QWE67yp.', () => {
        assert.deepEqual(passwordRepeatValid('QWE67yp.','QWE67yp.'),true)
      })
      it('deberia devolver false para QWE67yp y 67yp', () => {
        assert.deepEqual(passwordRepeatValid('QWE67yp.','67yp'),false)
      })
    });
  });
  