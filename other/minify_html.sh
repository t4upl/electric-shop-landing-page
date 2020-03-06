
function minify_html() {
  local src_file=$1
  local temp=temp
  
  html-minifier $1 --collapse-whitespace --remove-comments --remove-optional-tags \
--remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace \
--use-short-doctype --minify-css true --minify-js true > $temp
  
  cp $temp $src_file
  rm $temp
}

printf "\nminify html start"
minify_html $1
printf "\nminify html end"



