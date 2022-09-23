const mockingoose = require('mockingoose');

import Charger from '../models/Charger';

describe('Charger Model', () => {
  it('Should return a list of chargers', async () => {
    mockingoose(Charger).toReturn(
      [
        {
          serialNumber: '1',
          status: 'CONNECTED',
          Type: 'HPC',
        },
      ],
      'find'
    );

    const result = await Charger.find();
    expect(result.length).toBe(1);
    expect(result[0].serialNumber).toBe('1');
  });

  it('Serial number should be required on charger creation', async () => {
    try {
      const charger = new Charger({
        status: 'CONNECTED',
        type: 'HPC',
      });

      await charger.save();
    } catch (exception) {
      expect(exception.errors.serialNumber).toBeTruthy();
    }
  });
});
