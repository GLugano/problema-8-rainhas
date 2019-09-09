# Import the necessary packages and modules
import matplotlib.pyplot as plt
import numpy as np
import sys


x = np.linspace(0, 10, 100)
plt.plot(x, x, label='linear')
plt.legend()
plt.savefig('c:\\projetos\\faculdade\\problema-8-rainhas\\teste.png')