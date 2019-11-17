# Script for minifying css and js
# run from 'other' folder

echo $PWD
elmet_index="$(echo `expr match "$PWD" '.*elmet'`)"
elmet_path=${PWD:0:elmet_index}

uglify() {
  resources_folder=$1
  extension=$2
  dstFile=$3

  rm -f $dstFile
  touch $dstFile
  for f in $resources_folder/*.$extension
  do
    cat $f >> $dstFile
  done
  uglifycss $dstFile --output $dstFile
}

printf "\nuglifying css"
css_resources_folder=$elmet_path/css
css_dstFile=$elmet_path/css/minified/style.min.css
uglify $css_resources_folder "css" "$elmet_path/css/minified/styles.min.css"

printf "\nuglifying js"
js_resources_folder=$elmet_path/js
js_dstFile=$elmet_path/js/minified/script.min.js
uglify $js_resources_folder "js" $js_dstFile

printf "\nDONE"