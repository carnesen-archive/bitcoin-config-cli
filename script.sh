#!/bin/sh
set -x

bitcoin-config write --json '{"regtest": true, "daemon": true}'
bitcoin-config read
bitcoin-config read --format raw
bitcoin-config set --banscore 10
bitcoin-config read
