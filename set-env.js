const fs = require('fs');

const envConfigFile = `export const environment = {
   production: true,
   // @ts-ignore
   apiUrl: '${process.env.API_URL || ''}' || '',
   wheelSizeCookieName: 'wheel-size-filter'
};
`;

const targetPath = './src/environments/environment.prod.ts';

fs.writeFile(targetPath, envConfigFile, err => {
  if (err) {
    throw console.error(err);
  } else {
    console.log('Success', envConfigFile);
  }
});
