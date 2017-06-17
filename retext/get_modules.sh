#!/usr/bin/env bash

# clone 24 repos

#git clone git@github.com:wooorm/retext.git;
git rm -rf retext/retext --cached
git rm -rf retext --cached

git submodule add -f git@github.com:wooorm/retext.git retext
git add .gitmodules retext/retext

#git clone git@github.com:dunckr/retext-overuse.git;
git rm -rf retext/retext-overuse --cached
git rm -rf retext-overuse --cached

git submodule add -f git@github.com:dunckr/retext-overuse.git retext/retext-overuse
git add .gitmodules retext/retext-overuse

#git clone git@github.com:dunckr/retext-cliches.git;
git rm -rf retext/retext-cliches --cached
git rm -rf retext-cliches --cached

git submodule add -f git@github.com:dunckr/retext-cliches.git retext/retext-cliches
git add .gitmodules retext/retext-cliches

#git clone git@github.com:admhlt/retext-usage.git;
git rm -rf retext/retext-usage --cached
git rm -rf retext-usage --cached

git submodule add -f git@github.com:admhlt/retext-usage.git retext/retext-usage
git add .gitmodules retext/retext-usage

#git clone git@github.com:wooorm/retext-simplify.git;
git rm -rf retext/retext-simplify --cached
git rm -rf retext-simplify --cached

git submodule add -f git@github.com:wooorm/retext-simplify.git retext/retext-simplify
git add .gitmodules retext/retext-simplify

#git clone git@github.com:wooorm/retext-equality.git;
git rm -rf retext/retext-equality --cached
git rm -rf retext-equality --cached

git submodule add -f git@github.com:wooorm/retext-equality.git retext/retext-equality
git add .gitmodules retext/retext-equality

#git clone git@github.com:wooorm/retext-contractions.git;
git rm -rf retext/retext-contractions --cached;
git rm -rf retext-contractions --cached;

git submodule add -f git@github.com:wooorm/retext-contractions.git retext/retext-contractions
git add .gitmodules retext/retext-contractions

#git clone git@github.com:wooorm/retext-diacritics.git;
git rm -rf retext/retext-diacritics --cached
git rm -rf retext-diacritics --cached

git submodule add -f git@github.com:wooorm/retext-diacritics.git retext/retext-diacritics
git add .gitmodules retext/retext-diacritics

#git clone git@github.com:wooorm/retext-dutch.git;
git rm -rf retext/retext-dutch --cached
git rm -rf retext-dutch --cached

git submodule add -f git@github.com:wooorm/retext-dutch.git retext/retext-dutch
git add .gitmodules retext/retext-dutch

#git clone git@github.com:wooorm/retext-english.git;
git rm -rf retext/retext-english --cached
git rm -rf retext-english --cached

git submodule add -f git@github.com:wooorm/retext-english.git retext/retext-english
git add .gitmodules retext/retext-english

#git clone git@github.com:wooorm/retext-emoji.git;
git rm -rf retext/retext-emoji --cached
git rm -rf retext-emoji --cached

git submodule add -f git@github.com:wooorm/retext-emoji.git retext/retext-emoji
git add .gitmodules retext/retext-emoji

#git clone git@github.com:wooorm/retext-indefinite-article.git;
git rm -rf retext/retext-indefinite-article --cached
git rm -rf retext-indefinite-article --cached

git submodule add -f git@github.com:wooorm/retext-indefinite-article.git retext/retext-indefinite-article
git add .gitmodules retext/retext-indefinite-article

#git clone git@github.com:wooorm/retext-keywords.git;
git rm -rf retext/retext-keywords --cached
git rm -rf retext-keywords --cached

git submodule add -f git@github.com:wooorm/retext-keywords.git retext/retext-keywords
git add .gitmodules retext/retext-keywords

#git clone git@github.com:wooorm/retext-latin.git;
git rm -rf retext/retext-latin --cached
git rm -rf retext-latin --cached

git submodule add -f git@github.com:wooorm/retext-latin.git retext/retext-latin
git add .gitmodules retext/retext-latin

#git clone git@github.com:wooorm/retext-passive.git;
git rm -rf retext/retext-passive --cached
git rm -rf retext-passive --cached

git submodule add -f git@github.com:wooorm/retext-passive.git retext/retext-passive
git add .gitmodules retext/retext-passive

#git clone git@github.com:wooorm/retext-profanities.git;
git rm -rf retext/retext-profanities --cached
git rm -rf retext-profanities --cached

git submodule add -f git@github.com:wooorm/retext-profanities.git retext/retext-profanities
git add .gitmodules retext/retext-profanities

#git clone git@github.com:wooorm/retext-readability.git;
git rm -rf retext/retext-readability --cached
git rm -rf retext-readability --cached

git submodule add -f git@github.com:wooorm/retext-readability.git retext/retext-readability
git add .gitmodules retext/retext-readability

#git clone git@github.com:wooorm/retext-redundant-acronyms.git;
git rm -rf retext/retext-redundant-acronyms --cached
git rm -rf retext-redundant-acronyms --cached

git submodule add -f git@github.com:wooorm/retext-redundant-acronyms.git retext/retext-redundant-acronyms
git add .gitmodules retext/retext-redundant-acronyms

#git clone git@github.com:wooorm/retext-repeated-words.git;
git rm -rf retext/retext-repeated-words --cached
git rm -rf retext-repeated-words --cached

git submodule add -f git@github.com:wooorm/retext-repeated-words.git retext/retext-repeated-words
git add .gitmodules retext/retext-repeated-words

#git clone git@github.com:wooorm/retext-sentence-spacing.git;
git rm -rf retext/retext-sentence-spacing --cached
git rm -rf retext-sentence-spacing --cached

git submodule add -f git@github.com:wooorm/retext-sentence-spacing.git retext/retext-sentence-spacing
git add .gitmodules retext/retext-sentence-spacing

#git clone git@github.com:wooorm/retext-sentiment.git;
git rm -rf retext/retext-sentiment --cached
git rm -rf retext-sentiment --cached

git submodule add -f git@github.com:wooorm/retext-sentiment.git retext/retext-sentiment
git add .gitmodules retext/retext-sentiment

#git clone git@github.com:wooorm/retext-smartypants.git;
git rm -rf retext/retext-smartypants --cached
git rm -rf retext-smartypants --cached

git submodule add -f git@github.com:wooorm/retext-smartypants.git retext/retext-smartypants
git add .gitmodules retext/retext-smartypants

#git clone git@github.com:wooorm/retext-spell.git;
git rm -rf retext/retext-spell --cached
git rm -rf retext-spell --cached

git submodule add -f git@github.com:wooorm/retext-spell.git retext/retext-spell
git add .gitmodules retext/retext-spell

#git clone git@github.com:wooorm/retext-stringify.git;
git rm -rf retext/retext-stringify --cached
git rm -rf retext-stringify --cached

git submodule add -f git@github.com:wooorm/retext-stringify.git retext/retext-stringify
git add .gitmodules retext/retext-stringify

#git clone git@github.com:wooorm/retext-syntax-mentions.git;
git rm -rf retext/retext-syntax-mentions --cached
git rm -rf retext-syntax-mentions --cached

git submodule add -f git@github.com:wooorm/retext-syntax-mentions.git retext/retext-syntax-mentions
git add .gitmodules retext/retext-syntax-mentions

#git clone git@github.com:wooorm/retext-quotes.git;
git rm -rf retext/retext-quotes --cached
git rm -rf retext-quotes --cached

git submodule add -f git@github.com:wooorm/retext-quotes.git retext/retext-quotes
git add .gitmodules retext/retext-quotes

