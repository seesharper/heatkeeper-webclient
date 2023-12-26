#load "nuget:Dotnet.Build, 0.22.0"
#load "nuget:dotnet-steps, 0.0.2"

/*Need to override these because web project does not have csproj with these variable defined*/
var dockerImageName = "heatkeeper.webclient";
var TagVersion = BuildContext.LatestTag;


[DefaultStep]
AsyncStep build = async () =>
{
    await BuildClient();
    await BuildContainer();

    if (BuildContext.IsTagCommit)
    {
        await PushContainer();
    }
};

AsyncStep RunPlaywrightTests = async () =>
{
    await Command.ExecuteAsync("npx", "playwright install");
    await Command.ExecuteAsync("npx", "playwright install-deps");
    await Command.ExecuteAsync("npm", "run test:integration");
    //await Command.ExecuteAsync("npm", "run test:unit"); // Comment in when we have unit tests
};

AsyncStep BuildClient = async () =>
{
    await Command.ExecuteAsync("npm", "install");

    // await RunPlaywrightTests();

    await Command.ExecuteAsync("npm", "run build");
};

AsyncStep dockerImage = async () =>
{
    await Docker.BuildAsync("bernhardrichter/heatkeeper.webclient", BuildContext.LatestTag, BuildContext.RepositoryFolder);
    await Docker.BuildAsync("bernhardrichter/heatkeeper.webclient", BuildContext.LatestTag, BuildContext.RepositoryFolder);
};


AsyncStep BuildContainer = async () =>
{
    WriteLine($"Building container for version {TagVersion}");
    await Command.ExecuteAsync("docker", $"build --pull --rm  --no-cache -t bernhardrichter/{dockerImageName}:latest .", BuildContext.RepositoryFolder);
    await Command.ExecuteAsync("docker", $"tag bernhardrichter/{dockerImageName}:latest bernhardrichter/{dockerImageName}:{TagVersion}");
};


AsyncStep PushContainer = async () =>
{
    var username = Environment.GetEnvironmentVariable("DOCKERHUB_USERNAME");
    var password = Environment.GetEnvironmentVariable("DOCKERHUB_PASSWORD");
    await Command.ExecuteAsync("docker", $"login --username {username} --password {password}", BuildContext.RepositoryFolder);
    await Command.ExecuteAsync("docker", $@"push bernhardrichter/{dockerImageName}:{BuildContext.LatestTag}", BuildContext.RepositoryFolder);
    await Command.ExecuteAsync("docker", $@"push bernhardrichter/{dockerImageName}:latest", BuildContext.RepositoryFolder);
};

await StepRunner.Execute(Args);
