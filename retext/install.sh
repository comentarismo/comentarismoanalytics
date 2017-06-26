#!/usr/bin/env bash

# clone 24 repos
DIR=$PWD/retext

cd $DIR/retext && yarn || true && npm run build;
cd $DIR/retext/packages/retext-dutch && yarn ||true && npm run build || true;
cd $DIR/retext/packages/retext-english && yarn ||true && npm run build || true;
cd $DIR/retext/packages/retext-latin && yarn ||true && npm run build || true;
cd $DIR/retext/packages/retext-stringify && yarn ||true && npm run build || true;

#cd $DIR/retext-dutch && yarn;
#cd $DIR/retext-english && yarn;
#cd $DIR/retext-latin && yarn;
#cd $DIR/retext-stringify && yarn;

cd $DIR/retext-overuse && yarn ||true && npm run build || true;
cd $DIR/retext-cliches && yarn ||true && npm run build || true;

cd $DIR/retext-usage && yarn ||true && npm run build || true;

cd $DIR/retext-simplify && yarn ||true && npm run build || true;
cd $DIR/retext-equality && yarn ||true && npm run build || true;
cd $DIR/retext-contractions && yarn ||true && npm run build || true;
cd $DIR/retext-diacritics && yarn ||true && npm run build || true;

cd $DIR/retext-emoji && yarn ||true && npm run build || true;
cd $DIR/retext-indefinite-article && yarn ||true && npm run build || true;
cd $DIR/retext-keywords && yarn ||true && npm run build || true;

cd $DIR/retext-passive && yarn ||true && npm run build || true;
cd $DIR/retext-profanities && yarn ||true && npm run build || true;
cd $DIR/retext-readability && yarn ||true && npm run build || true;
cd $DIR/retext-redundant-acronyms && yarn ||true && npm run build || true;
cd $DIR/retext-repeated-words && yarn ||true && npm run build || true;
cd $DIR/retext-sentence-spacing && yarn ||true && npm run build || true;
cd $DIR/retext-sentiment && yarn || true && npm run build || true;
cd $DIR/retext-smartypants && yarn ||true && npm run build || true;
cd $DIR/retext-spell && yarn ||true && npm run build || true;
cd $DIR/retext-syntax-mentions && yarn ||true && npm run build || true;
cd $DIR/retext-quotes && yarn ||true && npm run build || true;
