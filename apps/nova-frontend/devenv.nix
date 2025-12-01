{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  # https://devenv.sh/basics/
  env.GREET = "Yobble";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    git
    eslint
    bun
  ];

  scripts = {
    testProdBuild.exec = "bun vite build && bunx serve ./dist -l 5173 -c ../serve.json";
    build.exec = "bun run build";
    run.exec = "bun run dev";
  };

  processes.docker = {
    exec = "./deploy.bash";
  };

  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  git-hooks.hooks.eslint.enable = true;
}
