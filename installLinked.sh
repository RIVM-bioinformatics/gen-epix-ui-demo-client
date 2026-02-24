#!/bin/bash
OUTPUT=`node -e "const j = JSON.parse(fs.readFileSync('package.json')); const v = j.dependencies['@gen-epix/ui']; j.dependencies['@gen-epix/ui'] = 'file:../gen-epix-ui'; fs.writeFileSync('package.json', JSON.stringify(j, null, 2), 'utf-8'); console.log(v); process.exit(0)"`
echo "Successfully set @gen-epix/ui version from $OUTPUT to file:../gen-epix-ui in package.json"
npm install
