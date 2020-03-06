# Script to create folder ready to be deployed to server with all additional stuff removed
# run from 'other' folder of project

# values to be set
copy_with_resources=true
deploy_folder_name=elmet_deploy

# script start

printf "\nlocation from which I am running script\n$PWD\n"


elmet_index="$(echo `expr match "$PWD" '.*elmet'`)"
elmet_path=${PWD:0:elmet_index}
printf "\nelmet folder path\n"
printf "$elmet_path\n"
elmet='elemet'
elemet_length=${#elmet}
path_index_without_elemet=`expr $elmet_index - $elemet_length`
folder_with_elmet_project=${PWD:0:path_index_without_elemet}
printf "\ndirectory containing elemt folder\n$folder_with_elmet_project\n"

deploy_folder=$folder_with_elmet_project/$deploy_folder_name

printf "\nelmet deploy folder:\n$deploy_folder\n"

# minify css and js
printf "\nminification of css and js in progress..."
./minify_css_and_js.sh >/dev/null
printf "\nminification of css and js done."


#remove old deploy folder and copy content of project to deploy folder
rm -rf $deploy_folder
printf '\n\ncopy elemet from src to deploy'
cp -r $elmet_path $deploy_folder

# remove not deployables
printf '\nremove not deployables'
rm -rf $deploy_folder/{.vscode,.git,other,.gitignore,.htaccess,robots.txt,sitemap.xml}

# remove resources if copy_with_resources set to 'false' 
if [ "$copy_with_resources" = "false" ]; then
  printf '\nremove resources' 
  rm -rf $deploy_folder/resources
fi

# minify html pages
printf "minify html\n"
index_html=$deploy_folder/index.html
printf "index_html: $index_html"
./minify_html.sh $index_html 

# end
printf "END"


