#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import argparse
import time

from dblp_parser import parse_record

def opciones_dblp_output():

    pparser = argparse.ArgumentParser()
    pparser.add_argument('--dblp', required=True, help='DBLP file')
    pparser.add_argument('--output', required=True, help='Output file')
    args = pparser.parse_args()
    if not os.path.exists(args.dblp):
        raise FileNotFoundError('{} does\' exist.'.format(args.dblp))
    return args


if __name__ == "__main__":

    args = opciones_dblp_output()
    start_time = time.time()
    parse_record(args.dblp, args.output)
    end_time = time.time()
    tiempo_total = end_time - start_time
    print(f"Tiempo total de ejecución: {tiempo_total:.2f} segundos")
