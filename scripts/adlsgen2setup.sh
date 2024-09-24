 #!/bin/sh

. ./scripts/loadenv.sh

<<<<<<< HEAD
if [ -n "$AZURE_ADLS_GEN2_STORAGE_ACCOUNT" ]; then
=======
if [ -z "$AZURE_ADLS_GEN2_STORAGE_ACCOUNT" ]; then
>>>>>>> 0225f751f75c4d7149b35f1d88a17cab5a041ab0
    echo 'AZURE_ADLS_GEN2_STORAGE_ACCOUNT must be set to continue'
    exit 1
fi

echo 'Running "adlsgen2setup.py"'

./.venv/bin/python ./scripts/adlsgen2setup.py './data/*' --data-access-control './scripts/sampleacls.json' --storage-account "$AZURE_ADLS_GEN2_STORAGE_ACCOUNT" -v
