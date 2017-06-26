#!/usr/bin/env bash

# clone 24 repos
DIR=$PWD/retext

cd $DIR/retext && yarn || true && npm run build;
cd $DIR/retext/retext/packages/retext-dutch && yarn;
cd $DIR/retext/retext/packages/retext-english && yarn;
cd $DIR/retext/retext/packages/retext-latin && yarn;
cd $DIR/retext/retext/packages/retext-stringify && yarn;

#cd $DIR/retext-dutch && yarn;
#cd $DIR/retext-english && yarn;
#cd $DIR/retext-latin && yarn;
#cd $DIR/retext-stringify && yarn;

cd $DIR/retext-overuse && yarn;
cd $DIR/retext-cliches && yarn;

cd $DIR/retext-usage && yarn;

cd $DIR/retext-simplify && yarn;
cd $DIR/retext-equality && yarn;
cd $DIR/retext-contractions && yarn;
cd $DIR/retext-diacritics && yarn;

cd $DIR/retext-emoji && yarn;
cd $DIR/retext-indefinite-article && yarn;
cd $DIR/retext-keywords && yarn;

cd $DIR/retext-passive && yarn;
cd $DIR/retext-profanities && yarn;
cd $DIR/retext-readability && yarn;
cd $DIR/retext-redundant-acronyms && yarn;
cd $DIR/retext-repeated-words && yarn;
cd $DIR/retext-sentence-spacing && yarn;
cd $DIR/retext-sentiment && yarn || true && npm run build || true;
cd $DIR/retext-smartypants && yarn;
cd $DIR/retext-spell && yarn;
cd $DIR/retext-syntax-mentions && yarn;
cd $DIR/retext-quotes && yarn;
