#!/usr/bin/env bash

# clone 24 repos
DIR=$PWD

cd $DIR/retext && npm i && npm run build |true;
cd $DIR/retext/packages/retext-dutch && npm i && npm run build |true;
cd $DIR/retext/packages/retext-english && npm i && npm run build |true;
cd $DIR/retext/packages/retext-latin && npm i && npm run build |true;
cd $DIR/retext/packages/retext-stringify && npm i && npm run build |true;

#cd $DIR/retext-dutch && npm i && npm run build;
#cd $DIR/retext-english && npm i && npm run build;
#cd $DIR/retext-latin && npm i && npm run build;
#cd $DIR/retext-stringify && npm i && npm run build;

cd $DIR/retext-overuse && npm i && npm run build |true;
cd $DIR/retext-cliches && npm i && npm run build |true;

cd $DIR/retext-usage && npm i && npm run build |true;

cd $DIR/retext-simplify && npm i && npm run build |true;
cd $DIR/retext-equality && npm i && npm run build |true;
cd $DIR/retext-contractions && npm i && npm run build |true;
cd $DIR/retext-diacritics && npm i && npm run build |true;

cd $DIR/retext-emoji && npm i && npm run build |true;
cd $DIR/retext-indefinite-article && npm i && npm run build |true;
cd $DIR/retext-keywords && npm i && npm run build |true;

cd $DIR/retext-passive && npm i && npm run build |true;
cd $DIR/retext-profanities && npm i && npm run build |true;
cd $DIR/retext-readability && npm i && npm run build |true;
cd $DIR/retext-redundant-acronyms && npm i && npm run build |true;
cd $DIR/retext-repeated-words && npm i && npm run build |true;
cd $DIR/retext-sentence-spacing && npm i && npm run build |true;
cd $DIR/retext-sentiment && npm i && npm run build |true;
cd $DIR/retext-smartypants && npm i && npm run build |true;
cd $DIR/retext-spell && npm i && npm run build |true;
cd $DIR/retext-syntax-mentions && npm i && npm run build |true;
cd $DIR/retext-quotes && npm i && npm run build |true;
