setlocal


@REM dir ..\..\..\ss-word-cloud-site\

set SRC=%~dp0.
set DST=%~dp0..\..\ss-word-cloud-site\docs\pb

xcopy /sy %SRC% %DST%
pushd %DST%
@REM dir
git add .
@REM @REM dir
git commit -am "update"
git push
popd
start https://github.com/nockm/ss-word-cloud-site/actions
start https://nockm.github.io/ss-word-cloud-site/pb/index.html