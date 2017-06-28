#!/usr/bin/env bash

# clone 24 repos
DIR=$PWD/retext

cd $DIR/retext && rm -rf .git ||true && rm -rf node_modules ||true && yarn || true && npm run build;
cd $DIR/retext/packages/retext-dutch && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext/packages/retext-english && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext/packages/retext-latin && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext/packages/retext-stringify && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;

#cd $DIR/retext-dutch && rm -rf .git ||true && rm -rf node_modules ||true && yarn ;
#cd $DIR/retext-english && rm -rf .git ||true && rm -rf node_modules ||true && yarn ;
#cd $DIR/retext-latin && rm -rf .git ||true && rm -rf node_modules ||true && yarn ;
#cd $DIR/retext-stringify && rm -rf .git ||true && rm -rf node_modules ||true && yarn ;

cd $DIR/retext-overuse && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-cliches && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;

cd $DIR/retext-usage && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;

cd $DIR/retext-simplify && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-equality && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-contractions && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-diacritics && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;

cd $DIR/retext-emoji && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-indefinite-article && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-keywords && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;

cd $DIR/retext-passive && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-profanities && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-readability && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-redundant-acronyms && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-repeated-words && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-sentence-spacing && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-sentiment && rm -rf .git ||true && rm -rf node_modules ||true && yarn  || true && npm run build || true;
cd $DIR/retext-smartypants && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-spell && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-syntax-mentions && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
cd $DIR/retext-quotes && rm -rf .git ||true && rm -rf node_modules ||true && yarn  ||true && npm run build || true;
