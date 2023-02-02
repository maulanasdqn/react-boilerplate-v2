{ pkgs, ... }:

{
  packages = with pkgs; [
     nodejs
     nodePackages.yarn
     nodePackages.prettier
     nodePackages.typescript
     nodePackages.typescript-language-server
  ];

  enterShell = ''
    export PATH=~/.npm-packages/bin:$PATH
    export NODE_PATH=~/.npm-packages/lib/node_modules 
  '';

}
