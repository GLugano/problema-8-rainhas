import matplotlib.pyplot as plt
import numpy as np
import json
import sys

y = json.loads(sys.argv[1])
x = np.linspace(1, len(y['data']), len(y['data']))
plt.plot(x, y['data'], label='linear')
plt.legend()
plt.savefig('./grafico.png')