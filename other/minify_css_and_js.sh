# Script for minifying css and js
# run from 'other' folder

echo $PWD
elmet_index="$(echo `expr match "$PWD" '.*elmet'`)"
elmet_path=${PWD:0:elmet_index}
css_path=$elmet_path/css 

echo $elmet_path
echo $css_path

extension=css

for f in $css_path/*.$extension
do
  echo "-------"
  echo "Processing $f"
  name=$(basename "$f" .$extension)
  echo $name
  path_to_file_after_min=$css_path/minified/$name.min.$extension
  echo $path_to_file_after_min
  uglifycss $f --output $path_to_file_after_min

done

printf "\nDONE"