#!/usr/bin/env python
import pandas as pd
import numpy as np

sample_size = 10000

df = pd.DataFrame()
df['x'] = np.arange(1,sample_size+1)
df['y'] = np.random.rand(sample_size)
print(df)
df.to_csv('sample_data_10L.csv',index=False)
