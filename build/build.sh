# To execute this build script we only need Docker. That's it ❤️
#Create docker volumes with the commithash as postfix to ensure that two builds don't use the same values.
commitHash=$(git rev-list HEAD --max-count=1)
set -e
echo "Building using container with commithash: " $commitHash
docker build --pull --no-cache --rm -f "Dockerfile.build" -t adminportal-webclient-buildcontainer .
docker run --rm --network=host --env ACCESSTOKEN -v //var/run/docker.sock:/var/run/docker.sock -v //usr/bin/docker:/usr/bin/docker adminportal-webclient-buildcontainer:latest //root/.dotnet/tools/dotnet-script build/build.csx