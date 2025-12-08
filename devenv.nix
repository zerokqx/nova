{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  env.GREET = "NovaAI";

  packages = with pkgs; [
    git
    insomnia
    eslint

    nest-cli
    docker-compose
    openssl
    bun
    prisma
    prisma-engines
  ];
  env = {
    PKG_CONFIG_PATH = "${pkgs.openssl.dev}/lib/pkgconfig";
    PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
    PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
    PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
    PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
  };

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
