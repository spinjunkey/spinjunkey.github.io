import pandas as pd
from pyweb import pydom
from pyodide.http import open_url
from pyscript import display
from js import console

import matplotlib.pyplot as plt
import matplotlib.tri as tri
import numpy as np

url = "https://raw.githubusercontent.com/washingtonpost/data-2C-beyond-the-limit-usa/main/data/processed/climdiv_national_year.csv"
url2 = "https://raw.githubusercontent.com/washingtonpost/data-2C-beyond-the-limit-usa/main/data/processed/climdiv_state_year.csv"


df = pd.read_csv(open_url(url))

## import national average temperatures
nat_av = pd.read_csv(open_url(url))
temps = pd.read_csv(open_url(url2))

#plt.plot(nat_av['year'], nat_av['temp'])

temps

for x in range(0, 78):
	plt.plot(temps.loc[temps['fips'] == x]['year'],
			 temps.loc[temps['fips'] == x]['temp'], color = '0.8')
	plt.plot(nat_av['year'], nat_av['temp'], color = '0.3')


#pydom["div#pandas-output"].style["display"] = "block"

#display(df, target="pandas-output-inner", append="False")
display(plt, target="mpl")
