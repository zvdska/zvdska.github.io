/* ============================================================
   ROOTS BOOK — данные артистов
   ============================================================ */

const XL_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAKyA+gDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwUGBwQI/8QARhAAAgEDAwIEBAQFAwQCAQIHAQIAAxEEEiExBUETBiJRYQcycYEUI0KRoRVSscHRQ2LhFiSC8AjxJTRTgpKisrM1RGP/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJhEAAgIBBAICAgMBAAAAAAAAAAECEQMEEiExQVEFEyIyYRQjBv/aAAwDAQACEQMRAD8A6HcpJEnldl3sRw4NqIQICDpIKh3IN5CwSjkgAJKChKgpAgUiKAQJIkkASSSKAQJKKQEIIkkkBEfnRJKPX7CQnwUgN2vpO3+ynGP7Tn/6f9E7/wCn/RRLXfE0Aic/9P8AopqQaAegc/8AT/onx1Qz/wDT/olF6/YEDONP0KpQ0f8A/lz1TT9Ch9UPqIx3XP8A6f6UOKp/Cs+xj/6f6JnH9SlZ/uu8xI9TN8lQm31FhLj/AGP7hs4o+SwPr9tqE0T7iM9x8j/dOSKSMjcOtq1PBjZUlBK3zGepM1qYPfoQY4/BLmxsjR8lFYzo8lJI9v5Ug4G0lFAkkkoBFJEjSAJJJJADSTVXcSSTQKSTaSaAcTSpJp2gW6D/AKf9UP8ATH0/qih9RQL/AKf9EOAf9P8AofUUC/6f9EA0P+n/AEQTQ/6f9E0J8Uh1BokjyKFsPHQKzKAjNI4XeAbNhaupsjPT3xVIfmM9BTNrqvOOB2peSJVFEYRFbXWWKY6DFCXWlaHnjR2wOMLnU5xQdBFrHwj+lWrZ6qEIn9Ok+aQVpbNlB4Ipd10L96qBcMEDoO9NfmQ/rGnkA+aCsJH+GcH9wWzYnU3z1qLdcLnBIoISzHU1n+E6M4gcMHjnii/OYzUvXAxjNBaK5r0EGqcEUw6ivBjrRJlokgSHjnG5rDG9Kk2E4TZlwR6PSMPGwvXVOfa2QCTweTQBIYSbYQY6dR8qNhcPqkkPuPUEEE0oomZo+VZI8lS0YHIFH0lRoq0jXjO12X3VfkK/dCJ8kgH2/pQMdo0BOkg0LOsvUeVLmwHksmkuXbf5g50nyCLxi/lOKk6XCiK5xAmnrDS0AmznU4CHf8xhH80YlUsdQZNzLAB1P0FDxynbb3B+m1M0dOnQeMdA9Ma16yfPXA5FGYU8UcrQCiZBc4B/xrK4Rqvk8mn9M5jY+9NPeh4/wAxIQFCa4kKKI8B8HdIQPpXkiUnBUsPUUpaHFN+8xkeq6iiWjKQAZv8k5D5FIRPzMpySR9UgNSbYnZm8jZWmIhSc4NBaOL+GO1WYkMcauT+GBkChzLoDFAZ0lVzQIVEYtl4G7t70XKMHhkGT0zSpJXY+G0OyfTFRySoBUx2xVjkbnPtXbP7HHTS7SxG5+YIiAOAT29aWbGnLKChDDoFOaKlKS/EF5vTPQfWlvhkjbUD3ye4x/nRQg/ZuDJlDsQlfL3o8mfy2VVjZmxwSMY/ejPjMhAQ8fQV0iQ2rrCC3lqAxHOTxRr/hqfEy4ZFCF3fSuOxo7XA0kQiJqZeg4GafHZ7mLIfhAAqNGFhg44rNfhrXHgcz7YU6/L5tPB2H+U9jTKN4RH5jY5R8AR2VquQFbUwLcYY46VVvbYd6nWpS6+P8AtxwF3dc0IuVjPOD6ZUlifzGF9SRXe1jjTk6dY5aM8sAayzHVE00PA+I0Yh8mzC3mFsn4TSAxIiCg9zSc4dRhSQTk1lE55CB+YKPKgqCyVi4iyEbtu/N1Fdi7hunkoDzik0jZk9Cf5uOmKcbY5+6WV+w9c8ZoZKTKr9RSY3ceGqZbadnwoT/pQvHOAPWmKQ2AhwuffFYnfeAo5J/EOTQ2Cyvx8Jo6i0EkgN7DPqad3RyRknbnjnvxSC5g+VgOa7ZGjfEjHdyBmnKTF7RXi92kh+HHHmDgVMulEUwZWJ3fTFRIhFwMEcHkClTs2fSGH25pnKh6L/f6nSDwPTFAigMwOScDio8YSMnf6Z6b/wAKKLPTaQwzuOe3NDdIrogsxdJEnRMe2adjhVjhySR7HgVCZ0GN5wPfNFVpPynGD/dSpUMuxE9nlAAY+/em2t8jIEitxnk80y+2QDL5PXNJH4hy+Ph6ilW3ok2xw2rn8Sn9Kd90ZfSj/kJUZ58rDpj80DFvRJT8sn6VXHYgVSaP3wG3H0GKvW8LOQFTP0FQ4rURyIF2/D9DUuwv57F0Nva3T5jw6/w5wa61vhu5uMSXRSCH1PWuiRQrGgWNAqjsBio8nGJqPHkyU7RRt45FaGCwiWKMDA9SfnRDBGwwUXHup6nH8jS/Nx1LNnGKfHNGwyH+lNqxV6L//9k=";
const FOX_PHOTO = "data:image/jpeg;base64,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";
const TILLA_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAEsASwDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcGBQQDAv/EACwQAAECBQMDAwQDAQAAAAAAAAECAwAEBQYRISIxEjJBUXETFCNhFYGRQ7H/xAAZAQEBAQEBAQAAAAAAAAAAAAAABAMFAgb/xAAmEQABAgUCBgMAAAAAAAAAAAABAAIDBBExQXEFEyEyUZFCYaH/2gAMAwEAAhEDEQA/AOlqbdKuLAxU3JJDkAiOJnxUqNyNXOZuP4gPtb2Mp8sKzHhqfz+lQlRTS0yTvirV18Iio1UN3iNRTfXHSb0hqVEwJv4nn9BSK6QQqiRqrZFcRFV0K2Wf+7q0k9wgKbA0jNqYbXHtabPXsq4dqi2qmyfPh4qXK/lJc79wTb8vNiKTs2c3Ub0O9WGuwUXfDGtvcphKMDmg1Y+PsSNW1HlxHnnhF/tqvGr1vDh9tKS68Utd5VW6+2rz4eKr3lxfdCdCJdY86tp16Sbfin5j3AoWo3wpbb6b8LbjrxUcW1UhKvw5RTSlS0dvZP4x+Ic4VU2j2t8Pv4qF+GUeZW2VuqLTS+3jVfxxQGqrGWy4mDs+Op9Kt5J9CjQd6iBAeeUeqYy/DIGnbxWG3P8ArfCLwB1cbfxUY9x+DVXG8ncKr3lJZbXfxwv+Vr+f+7ncbfvUJXjJVfPKrieBz1Rc8s7f+z2u7BjWXPCn8L7O7ODcRl+dTHVxu9Qtb1BryqsjHUvtGnjqOOQZL8Ka6r8N7O7ODuIn9dSpDL7cAVfWkfE8pRQ2P4tYuPY6qmvHDzHwjO0/hPUOK/gv3IqPS3Uu0jN4a37Xf4PdyLtxlq7v8t7DWn2/L+m7z1LPeXTL4NpqQxeI2n2f1PkPmWiT4V4/L3E3XUu5PZg9nJI35q7fB27/AKlvSJnzflw4c9x/RXFmb+SXfeb0v0nvfd5uz1o7wwm7DNH6Ct/hHKZfsm/g+z6/9j6JcnzRT/kO51PZS5vN6HmvB3F1t23mrLmY7bd9Kf6MHhVv5fh+j0T2Ptn8L9m4d5aXnJ/dtWyBd9G4qtqZq8kUvcy1U9nc/DjZFRDdVXnnO4Wcz6+bnvOwqXdlNz3Dm3Z7ZzZbpu2r0h1yLtqfaEEEr7VN+m4l7iEECWc4uMTFDW3hLmHDrf1FQ0YWbCr3ncKtjaKlvTdY0Vhtd7VeuGCB6XKPKmMhTb2XjXFdBjWK7lm2LKKKlz1KyPGqUt7WM4uJdvaOe3PJdXV+qlNJqHtPQZq4vw+e6iavdLprSfXn0iHNZzOXG7iOtqRerYqU/1QG0YE/QtR3l+dnwaSt7QaHTPPYP/Z";
const KJ_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAEsASwDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcGBQMEAv/EACgQAAECBQMDBQEAAAAAAAAAAAECAwAEBQYREiExB0FRIhMUFRZhgf/EABkBAQADAQEAAAAAAAAAAAAAAAADBAUCBv/EACYRAAECAwYHAAAAAAAAAAAAAAABAgADEQQFEjFBIVFhcYHB8P/aAAwDAQACEQMRAD8A0pS/6XSbNoRP1RwvIkBS3nDlKf5oPNQyewC1DjrjXi9wjs0kUpWnyktI/tHrTLWfsB4vdIfOoUJ9pRHIkgcH4TfWWJ+cQmYlmzCC0k7pdZFwCe6vc/OG34hjnzWmVoStKW1qCQBt6bx8IUj2Q0lyzD4bZLijzUmzo1nA20PIx4T5Q3JI9jSyk2SFy7hnwoTMe3EQ2vpVOF4gG3EbfEbi/qLxjrmVQCFq6QeaTv8Am8Sacs2VYSAmXQR/YCf3iOWaHNu3+PsW1e9jm5SVOFCS4hRHZKgSPjB1nSSJhO3fRs4qxUnj8dhFYSk/CDNMotwtpzZLTaR6a1KH0jt6NcQXlkR6Jc4NLUE7bJUeqR3G0EMQdKTuKuP3jbmZ3nBHkI9pRT2FQXW9OAKgHKSlA6ADiCsulmzTawEja/E3iSFtNs2E0ZWmJgApJVYD3EWDNBDzO9Ku8XqcuhknyU4CkDgxOQpKSFo2iLPtqcQCkEwzXpjyKQKUx1FDDQGwHsIF+jptEACLIsBd1UlV0jaFbSaZLSicIsB2iN9RRrmQzq9tvcxlrUmBH4qDBk2acQeSCq5PoInFGkjafgxQotO83aI8+PziNMlIUE9uf1jSk1r0IyQFFAoaVBCiCQO0MHIajlLcnzqvUKm12TBLL9M25o6WU4y9lakKSpaVJVYm9x8DEXSSk9zNIcDaSlIWU7wLpuBcCJYVn7UN5aM+aCX/AKzc2/1RUTfy1zeQE0oh7CzOSyClh1sqHUKuI3jXsl+FQ2mmZlkKcTsp5SBb4X4iVc3sdZRnkoRnLYtBc/LcxJHqRl2vazIYffnh0V/BiOMh5xTLbKz5eXbeIXppRcSttoVi6i4LNJPMKPMkeCQfvHnJKfEfmt7pJPceIn6c9dCkKG5AhaK5Qi/xJd/AXFvHcxV2gsy9DPUlIQ4Nrn24VjulZoxHnjbtNoIRhO4v6ic00fbWopZbLzhSATxKcxTaOpubuq7QyU7YSGx0jgHzZWEt1RQvxWCFdiL2iRSAtYWQAcNwQOaknj9YMVKUXNPuq8pYbxAiwPPMHt7ROypJoAAWEB7SFXBIA9YZoq22NIySnhoq0oyBOSg6SEjaKh3zqPQrPBJmFV0hViB1Bt2gsSGsF17w1z8gxNMLZmm0uNqFihW0eNVJyJvcNQwFOm05xC/6VDEPfaG5R//9k=";
const KRBK_PHOTO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAEsASwDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAYFBAMCB//EACkQAAEDAgQFBQEAAAAAAAAAAAECAwQABQYRIRIxQVFhBxMUFRZhgf/EABkBAQADAQEAAAAAAAAAAAAAAAADBAUCBv/EACURAAECBAQHAAAAAAAAAAAAAAECAwAEBRESITFBBhMiUWFxUv/aAAwDAQACEQMRAD8A0oCSpQAG5MSDZuxk+M3nMdyu6TzcYE0dK1UsjcSocQmuiA8fZO1KSTuSTHSy0hM2FEdCP9x4qKEISJ/A7yUgt2wjxISfrmMbLE8jItxKJVGyHVfNVwT5EWlIBLSNq4kb/YRXPTUuQXFncADgAdSY0oyOTMWWZ8iiXpU7iQBcqPACJmnk2WWkstJASOJPU9zEjhz/AJyayqDUqu4E19eOitCbdSAuwEZaHR7RUAdyzTgtIvySf3jHrGvpqUgpp0lbnUcE/nEfLZ1KNJs4CxwUOI+onSopUV0inK6P66eLNZOFqGnl3H4G0J/PWKKgpVSc4vp8xrgHFqPuqQwavHcM48P7lWiIczqLzWMYlSJUGhqU4SoFPHTz+n5Ml9NsjZWWlLLnhSNu9oj1TXDXQqbLtLcVLKW5+PxE/JV2WoQoKZTfrbcSNPu3E4pWc3O6uzKGjZUpaW+SFOFClAcSByETZ4KROKuySpV1kdPMxFqbUlOfIcVlkjjjm3+RJTeTPeqJl5aH1c3Nl9YrJUR2mSy2XA4+8LWTx+2mF9Ap8yZ8vhJC22gpavC9CSTffi0FDIU08lu6nl8VqNhz0EEIhpS+2loJVe/gjTAOtVfEcqXlCXqzHSVSyEIWQPOwjq9GTL2XvJl3aeYcQtq6VJULFN9CJEnDadUXlOAOu3EQOgSs5Z8oW5tuXfXhBaKUFV+7NAWnAdT4iPuiJfsxOMzKk80Xxvw2SoTaXVBCwbEA6dO0V6vJKfXOl+FzaqMd39YneXZNKmFbCWkC9leq7dCPP9RSNy0RcLBSQdoM3MTBUdrKRfPzc47axG5nlylvOJyht4uJKrJUUKSCARfSPfKnDBnnZlUxmzWxrbSCUre3AlaR2/mL3nmT/lZgeypaSVJT9UAX0+8Nu6qbxBv6MelU8p6yg5vaWq5NPk2Xnn6cW4qShAT6UlPqIvfSNoOaULbcCbEHkR6R7BwOICu09v/2Q==";
const COV_SHARIKI = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABkAGQDASIAAhEBAxEB/8QAGgABAQADAQEAAAAAAAAAAAAAAAYDBAUBB//EACgQAAEDAwMDBAMBAAAAAAAAAAECAwQABREGEiExQVEUFWFxByKB/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAMEAQL/xAAiEQADAAIBAwUBAAAAAAAAAAAAAQIDESExBBIiQVFhE//aAAwDAQACEQMRAD8A0m2wsD0EqAOntTQ26Wty0kZH9DKPelmm31PMFDaVLKN0gc9enrRIS7bYqltNFtnASvsQR61bnUpuo6XT2QMe/wCVFmYS64lYIytOR9OhpiZlRLTa8IWEpAAAyAB3wKk0i8mvGmMVYVi3Iy4y0RgtnG5B549Kkxpb96T2mDcW3EqCloOR8xUX3IZDcAcKGVJ+m28j+ZplkyUqDbg2rzt7GjTLdcVJDDLYUFAlWTgAdKcKZO1P0iySQIeQrPBpwelMU7CBg58V4LciXVvW9nagSsMBAJPQ9frmoZ7CV6Q0GshtIB+B0oJHDmnhwSfNVstgL8pB5H1FUVEcyUqI6Gk6d9wSuxNJhKn2GcTVW6xEHRIB2q5+aBQPMkPtY60wtsFxk/uPajk6y+cckE0/lyC2sJHzHFDMWkkkDrmiK5Bx3poGm42/n8U5B8CmyPFYP8UQdVWlB2j4rz3zaakvFDp8CmZo4yaHKG2anFWKNwWSKcJlgYFPFBQprCirbQCzXX+aKUopoFadKCoI0jaZbYcQtSN0FQIH2yRSHY1pUlKe4XkYSNvhH1UPFA6Y9wUKI9M08UO4gdaCOoS0hxRWlOEZzjigcbg22+3sO8Sk4wG/n9OpwDmi6dCXHkuAFRQe6BjHnFA48qMpIzhtBH1qKN6DNhZOB6WoxLtwYQnDG08ZOOnpQlLLoJPl85z3PWjClY8xk9c0zdcTuHtQK5W6ZUVSU5NNJ7RS+wOOtDlrJoBK1lJyDS94Uwlwo9UHhtMKUpTAcw4Qs7QcgUx3G5uzUFtSlFtP1JHXPqfSpF1JbmY7pQFJUdqhio1qWlKkuBGVKPU9j2NWiP0RqvbFBstt85z0FSJv3M+2f/2Q==";
const COV_MOROZY = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABkAGQDASIAAhEBAxEB/8QAGgABAQADAQEAAAAAAAAAAAAAAAcEBQYCA//EACYQAAEDAwMEAgMAAAAAAAAAAAECAwQABREGEiExQVEUFWFxIkL/xAAZAQADAQEBAAAAAAAAAAAAAAADBAUCBv/EACARAAICAgIDAQEAAAAAAAAAAAABAgMEESEFEhMxUUH/2gAMAwEAAhEDEQA/ANJpNjaxcTdIcCVKuoHFJU2VYQMg47c1I0lFMVOKitOK3JScHqOprPTLxTIYD6UApShKgPXP70KzuXNvsBiULBUnlY6/vRZmMzGdSc5J5RwUopKgU7lc9ehp01wNoU7yjbjZ1D+VYlaEs2ZQtthTDoW8FYWkFO4Yz2696e0KmwPTr70zdRoLuXltoK3iSSU4z1/qeTfLK2j9nDaCtaMhJ+xR7uMuNyE7VZ2q6Z9KMFpTaeC5nbnvQpS0oaBWvA/M9K51DKlLdaEZW3twHaipQnCcbn8wCTijh1JHZ2qmDbfWpG4pQVA9O1Gm2FKYlXR3clZDIQfXvVWzGKZQ8lQC3M+Xy4xTNKgSAtxxlOBnvUpTgD9jSuvpxYNPUCX23bYQCd2R91G+lJXFcbeS+vnb1Cc7f6qKfBpe08ptFuKDD4dS3wo5xn3q80hbriFYCU8dvSlKqI4mQtDpAB8p7CoV5jZbShx3sfmt0/UmnZo5DTQCM55P/9k=";
const COV_7YA = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABkAGQDASIAAhEBAxEB/8QAGgABAQADAQEAAAAAAAAAAAAAAAcEBQYDAv/EACgQAAEDAwMDAwUAAAAAAAAAAAECAwQABREGEiExQRMUUWEHFSJxgf/EABkBAAMBAQEAAAAAAAAAAAAAAAADBAUCBv/EACIRAAEDAwQDAQAAAAAAAAAAAAECAxEABCESMUFRE0Ji/9oADAMBAAIRAxEAPwDS6TZ2sXE3SHAlSrqBxSVNhVtxjArHJnu72QwHwvahOBnv1r0Vpaz2eRcXk0MRUqQdxUAo9c+lRZ2/RXTjOAlySUCyOMYqK4ptt1YbwWlKcp3Fs1u9Sv3vklD3rGmpTBcaQ2niQpQ42n2/dQvJUwWy2AoBz9J6ZoDLzCyBnG3P7VNWcApJ+wpSKMSXipK2glLW9Ki2gEbjXQKG3o5PkFtHzuGkH8fF6D4y7Q1KYbFGWMlS3XN7SkgpS0O+O/f2/moFztzTe0zHVoQ8pDQQpQPfPTPtWi2u1sty3nOF1JQ2ptDKUdARz+/vmm7lqSlKykhKQABzR+G+2xnO4d+P76Y8VgLdyeXOGGnmnEkPqEkuAY2qOM9c1Iu9uet5TvzkNqCUpKkAY6UklQCcDoM1YZTb4hu9AZKELKm2Ho4A6+RpJHUUgo/jN7dtNRnzsO8oGeu6irSCG1KrOJ2mmjnpG4y2u7Q68VpwQU5H2NEZaLriUJIyo4GacP6BnCmXNwv4qNujpz3o1BbLksI9auQP6Xz1/dS+j6Qsq5J/GPKzu5cxzXOnBrp/E/wD1v0xxPQ80YoxRij0lZ/9k=";
const COV_VRAG = "data:image/jpeg;base64,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";
const COV_KAB = COV_VRAG;

let ARTISTS = [
  {
    id:'kj', name:'KJ', handle:'@kj_vovan', role:'Артист · ака ВОВАН',
    hue:'#C8C8CE', photo:KJ_PHOTO, photoPos:'center 20%',
    bio:'KJ, он же ВОВАН. Ветеран киевской сцены, один из «Зеленых Каштанов». Для него хип-хоп всегда был больше, чем музыка — стиль жизни, который не признает границ и принадлежит каждому.',
    followers:'8.7K', following:'—', releases:'12',
    skills:{flow:8.7, style:9.4, penmanship:8.9, musicality:8.6, legacy:9.8},
    tags:['#kj','#вован','#зеленыекаштаны','#oldschool','#kyiv','#90s'],
    rels:[{t:'Палач',y:'1997'},{t:'Киевские красотки',y:'2002 · клип на М1'},{t:'Мир в котором ты живешь',y:'2003 · альбом'}],
    article:`<p>Для KJ хип-хоп всегда был чем-то большим, чем просто музыка. Это стиль жизни, который не признает границ и принадлежит каждому.</p>`,
    comments:[]
  },
  {
    id:'tilla', name:'4ATTY AKA TILLA', handle:'@4attyakatilla', role:'Артист', verified:true,
    hue:'#9AA3B0', photo:TILLA_PHOTO, photoPos:'center 25%',
    bio:'4atty aka Tilla. Артист. 25 лет (было когда-то).',
    followers:'44.4K', following:'13.5M+', releases:'19',
    skills:{flow:9.5, style:9.2, penmanship:9.6, musicality:9.0, legacy:9.7},
    tags:['#4atty','#tilla','#rap'],
    article:`<p>«Ты ничего не добьёшься своим рэпом», — сказала ему она. Ему было девятнадцать...</p>`,
    rels:[
      {t:'Шарики/Фокусы', y:'2011', cov:COV_SHARIKI, link:''},
      {t:'Морозы', y:'2012', cov:COV_MOROZY, link:''},
      {t:'7я', y:'2014', cov:COV_7YA, link:''},
      {t:'Лучший враг', y:'2016 · альбом', artist:'Мосты', cov:COV_VRAG, link:''}
    ],
    comments:[],
    links:[{t:'Instagram', u:'https://instagram.com/4attyakatilla'}]
  },
  {
    id:'krbk', name:'KRBK', handle:'@krbk', role:'Артист · Коробок',
    hue:'#7FE08F', photo:KRBK_PHOTO, photoPos:'center 22%',
    bio:'KRBK (Коробок). 705K+ слушателей в месяц на Spotify.',
    followers:'501K', following:'198M+', releases:'14',
    skills:{flow:9.3, style:9.1, penmanship:9.4, musicality:9.5, legacy:9.0},
    tags:['#krbk','#коробок','#записки','#kyiv','#rap'],
    rels:[{t:'Крепче', y:'2016 · сингл', cov:COV_KAB, link:''}],
    comments:[],
    links:[{t:'Spotify', u:'https://open.spotify.com/artist/0E56Ncr2I37JQhW71UJALE'}]
  },
  {
    id:'fox', name:'FOX', handle:'@fox', role:'Режиссёр · Андрей Лисанов',
    hue:'#C2722E', photo:FOX_PHOTO, photoPos:'center 25%',
    bio:'Андрей Лисанов (FOX). Режиссёр и архитектор киевской «уличной эстетики», студия KinoMost.',
    followers:'—', following:'—', releases:'150+',
    skills:{flow:8.6, style:9.7, penmanship:8.8, musicality:9.2, legacy:9.6},
    tags:['#fox','#kinomost','#режиссер','#клипы','#kyiv'],
    article:`<p>Если вы смотрели клипы украинских рэперов в последние 15 лет, вы точно видели работу Андрея Лисанова.</p>`,
    rels:[], comments:[], links:[]
  },
  {
    id:'xl', name:'XL DELUXE', handle:'@xldeluxe', role:'Артист · Алексей Лялин',
    hue:'#D9A441', photo:XL_PHOTO, photoPos:'center 18%',
    bio:'XL Deluxe (Alex XL). Легенда киевского рэпа, участник «Зеленых Каштанов».',
    followers:'—', following:'—', releases:'—',
    skills:{flow:8.8, style:9.0, penmanship:8.7, musicality:8.9, legacy:9.9},
    tags:['#xldeluxe','#зеленыекаштаны','#kyiv','#oldschool','#90s'],
    article:`<p>Алексей Лялин, более известный как XL Deluxe — один из тех, кто закладывал фундамент столичного хип-хопа.</p>`,
    rels:[], comments:[], links:[]
  }
];

function initials(name){ return name.slice(0,2).toUpperCase(); }
function hasReleasePage(r){
  return (r.tracks && r.tracks.length) || (r.credits && r.credits.length) || r.platforms;
}
function escapeHtml(s=''){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeAttr(s=''){ return escapeHtml(s); }


/* ---------- дополнительные артисты — заготовки, ждут наполнения редакторами ---------- */
ARTISTS = ARTISTS.concat([
  { id:'gyga', name:'Гига', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'metkvota', name:'Метквота', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'kozyr', name:'Козырь', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'iudzhyn', name:'Юджин', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'evpak', name:'Евпак', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'artyk-karaty', name:'Артик Караты', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'keks-karaty', name:'Кекс караты', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'snake-e', name:'Snake-E', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'max-gee', name:'Max Gee', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'steganov', name:'Стеганов', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'fozzy', name:'Фоззи', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'makstar', name:'Макстар', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'potap', name:'Потап', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'napylnyk', name:'Напильник', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'pozytyv', name:'Позитив', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'skat', name:'Скат', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'hardbeats', name:'Hardbeats', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'pava', name:'Пава', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'mrk', name:'Мрк', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'chacha', name:'Чача', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'savash-hdsh', name:'Саваш HDSH', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'hdsh', name:'Hdsh', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dj-pakhatam', name:'DJ Пахатам', role:'DJ', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dzh-medyssyon', name:'Дж медиссион', role:'DJ', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dzh-sender', name:'Дж сендер', role:'DJ', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dzh-mukvyk', name:'Дж муквик', role:'DJ', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dzh-shket', name:'Дж шкет', role:'DJ', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dr-up', name:'Dr.up', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'marty-bardak', name:'Марти бардак', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'tof-stolnyi-grad', name:'ТОФ стольный град', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'iarmak', name:'Ярмак', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'iazychnyk', name:'Язычник', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'vanek-klymenko', name:'Ванек Клименко', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'ledy-vamp', name:'Леди Вамп', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'nknkt', name:'Нкнкт', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'miach', name:'Мяч', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'yvan-buian', name:'Иван Буян', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'alan', name:'Алан', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'devyd', name:'Девид', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'oleg-drofa', name:'Олег дрофа', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'entony', name:'Энтони', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'maria-zb', name:'Маря зб', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dyktuem-faktom', name:'Диктуем фактом', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'nezavysymoe-mnenye', name:'Независимое мнение?', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'berezniaky-zu-byg-b', name:'Березняки зу Биг б', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'bagratyony', name:'Багратиони', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'lera-tygra', name:'Лера тигра', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'zerkala', name:'Зеркала', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'trym-trou', name:'Трим троу', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'marul', name:'Марул', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'zvdsk', name:'Zvdsk', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'fame', name:'Fame', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'pasha-morzh', name:'Паша морж', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'den', name:'Ден', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'kotia', name:'Котя', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'solo', name:'Solo', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'panyker', name:'Паникер', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'orlando-medzhyk', name:'Орландо Меджик', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'kudym', name:'Кудим', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'sysh', name:'Сыш', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'skaia', name:'Ская', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'tab', name:'Таб', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'nyl', name:'Нил', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'vladest', name:'Владэст', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'vnuk', name:'Vnuk', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'mono', name:'Моно', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'novel', name:'Новел', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'blekster', name:'Блэкстер', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'fyr-bardak', name:'Фир бардак', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'mykhalych-bardak', name:'Михалыч бардак', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'sashmyr', name:'Сашмир', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'ugo', name:'Ugo', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'kyivstoner', name:'Kyivstoner', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'shlem', name:'Шлем', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'bachman', name:'Бачман', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'sharkey', name:'SharKey', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'mykky', name:'Микки', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'dzherom', name:'Джером', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'arkhangel', name:'АрХангел', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'lesia-myshchuk', name:'Леся Мищук', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'bulyk', name:'Булик', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'iaguar', name:'Ягуар', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'syr', name:'Сыр', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
  { id:'anton-ly-kokka', name:'Антон Ли Кокка', role:'Артист', hue:'#2B2B2B', tags:[], rels:[] },
]);
